import fastify from 'fastify';
import fastifySwagger from 'fastify-swagger';
import process from 'process';
import { StatusCodes } from 'http-status-codes';
import { PORT } from './common/config';
import { BoardNotFoundError } from './errors/BoardNotFoundError';
import { IncorrectIdFormatError } from './errors/IncorrectIdFormatError';
import { TaskNotFoundError } from './errors/TaskNotFoundError';
import { UserNotFoundError } from './errors/UserNotFoundError';
import { UserTaskNotFoundError } from './errors/UserTaskNotFoundError';
import { boardRoutes } from './routes/boards.router';
import { taskRoutes } from './routes/tasks.router';
import { userRoutes } from './routes/users.router';
import { Logger } from './logger/Logger';
import { pinoLogger } from './logger/pinoLogger';

const server = fastify({
  logger: pinoLogger,
});

const logger = new Logger(server);
logger.configureRequestLogging();

server.setErrorHandler(async (error, _, reply) => {
  if (
    error instanceof BoardNotFoundError ||
    error instanceof TaskNotFoundError ||
    error instanceof UserNotFoundError ||
    error instanceof UserTaskNotFoundError
  ) {
    logger.warn(error.message);
    logger.debug(error);
    return reply
      .code(StatusCodes.NOT_FOUND)
      .header('Content-Type', 'application/json')
      .send({ message: `${error}.` });
  }
  if (error instanceof IncorrectIdFormatError) {
    logger.warn(error.message);
    logger.debug(error);
    return reply
      .code(StatusCodes.BAD_REQUEST)
      .header('Content-Type', 'application/json')
      .send({ message: `Incorrect ID format.` });
  }
  logger.error(`Internal error: ${error.message}`);
  logger.debug(error);
  reply.status(StatusCodes.INTERNAL_SERVER_ERROR);
  return reply.send();
});

process.on('uncaughtException', (err, origin) => {
  logger.error(`Caught exception: ${err}. Exception origin: ${origin}`);
  logger.debug(err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  process.exit(1);
});

server.register(fastifySwagger, {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'REST-service', version: '1.0' },
  },
});

server.register(boardRoutes);
server.register(userRoutes);
server.register(taskRoutes);

/**
 * Start server on port from .env
 * @returns this function doesn't return any value
 */
const start = async (): Promise<void> => {
  await server.listen(PORT);
};

start();
