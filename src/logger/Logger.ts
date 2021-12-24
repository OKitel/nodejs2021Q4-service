import { FastifyInstance, FastifyRequest } from 'fastify';

export class Logger {
  server: FastifyInstance;

  constructor(fastify: FastifyInstance) {
    this.server = fastify;
  }

  static info(req: FastifyRequest, ...args: unknown[]) {
    req.log.info(args);
  }

  warn(...args: unknown[]) {
    this.server.log.warn(args);
  }

  error(...args: unknown[]) {
    this.server.log.error(args);
  }

  configureRequestLogging() {
    this.server.addHook('preHandler', (req, _, done) => {
      if (req.body) {
        Logger.info(req, { body: req.body }, 'parsed body');
      }
      Logger.info(req, { query: req.query }, 'request query string');
      Logger.info(req, { params: req.params }, 'path params');
      done();
    });
  }
}
