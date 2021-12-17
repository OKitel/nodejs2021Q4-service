import fastify from 'fastify';
import fastifySwagger from 'fastify-swagger';
import { PORT } from './common/config';
import { boardRoutes } from './routes/boards.router';
import { taskRoutes } from './routes/tasks.router';
import { userRoutes } from './routes/users.router';

const server = fastify({ logger: true });

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
  try {
    await server.listen(PORT);
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

start();
