const fastify = require('fastify')({ logger: true });
// const app = require('./app');
const { PORT } = require('./common/config');

fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'REST-service' },
  },
});

fastify.register(require('./routes/boards.router'));
fastify.register(require('./routes/users.router'));
fastify.register(require('./routes/tasks.router'));

const start = async () => {
  try {
    await fastify.listen(PORT);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
