import 'reflect-metadata';
import { createConnection } from 'typeorm';
import fastify from 'fastify';
import fastifySwagger from 'fastify-swagger';
import { PORT } from './common/config';
import { boardRoutes } from './routes/boards.router';
import { taskRoutes } from './routes/tasks.router';
import { userRoutes } from './routes/users.router';
import { Logger, pinoLogger } from './logger';
import { globalErrorHandler } from './errors/globalErrorHandler';

const server = fastify({
  logger: pinoLogger,
});

const logger = new Logger(server);
logger.configureRequestLogging();

globalErrorHandler(server, logger);

createConnection();

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
  await server.listen(PORT, '0.0.0.0');
};

start();
