import { FastifyInstance } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { Logger } from '../logger/Logger';
import { BoardNotFoundError } from './BoardNotFoundError';
import { IncorrectIdFormatError } from './IncorrectIdFormatError';
import { TaskNotFoundError } from './TaskNotFoundError';
import { UserNotFoundError } from './UserNotFoundError';
import { UserTaskNotFoundError } from './UserTaskNotFoundError';

export const globalErrorHandler = (server: FastifyInstance, logger: Logger) => {
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
};
