import fastify from 'fastify';
import fastifySwagger from 'fastify-swagger';
import process from 'process';
import { PORT } from './common/config';
import { BoardNotFoundError } from './errors/BoardNotFoundError';
import { IncorrectIdFormatError } from './errors/IncorrectIdFormatError';
import { TaskNotFoundError } from './errors/TaskNotFoundError';
import { UserNotFoundError } from './errors/UserNotFoundError';
import { UserTaskNotFoundError } from './errors/UserTaskNotFoundError';
import { boardRoutes } from './routes/boards.router';
import { taskRoutes } from './routes/tasks.router';
import { userRoutes } from './routes/users.router';

const server = fastify({ logger: true });

server.addHook('preHandler', (req, _, done) => {
  if (req.body) {
    req.log.info({ body: req.body }, 'parsed body');
  }
  req.log.info({ query: req.query }, 'request query string');
  req.log.info({ params: req.params }, 'path params');
  done();
});

server.setErrorHandler(async (error, _, reply) => {
  if (
    error instanceof BoardNotFoundError ||
    error instanceof TaskNotFoundError ||
    error instanceof UserNotFoundError ||
    error instanceof UserTaskNotFoundError
  ) {
    server.log.warn(error);
    return reply
      .code(404)
      .header('Content-Type', 'application/json')
      .send({ message: `${error}.` });
  }
  if (error instanceof IncorrectIdFormatError) {
    server.log.warn(error);
    return reply
      .code(400)
      .header('Content-Type', 'application/json')
      .send({ message: `Incorrect ID format.` });
  }
  server.log.error('Internal error');
  reply.status(500);
  return reply.send();
});

process.on('uncaughtException', (err, origin) => {
  server.log.error(`Caught exception: ${err}. Exception origin: ${origin}`);
  process.exit(1);
});

process.on('uncaughtException', (err, origin) => {
  server.log.error(`Caught exception: ${err}. Exception origin: ${origin}`);
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
