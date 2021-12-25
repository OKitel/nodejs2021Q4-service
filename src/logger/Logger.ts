import { FastifyInstance, FastifyRequest } from 'fastify';

export class Logger {
  server: FastifyInstance;

  constructor(fastify: FastifyInstance) {
    this.server = fastify;
  }

  static info(
    req: FastifyRequest,
    obj: unknown,
    message: string,
    ...args: unknown[]
  ) {
    req.log.info(obj, message, ...args);
  }

  static trace(
    req: FastifyRequest,
    obj: unknown,
    message: string,
    ...args: unknown[]
  ) {
    req.log.trace(obj, message, ...args);
  }

  debug(obj: unknown, message?: string, ...args: unknown[]) {
    this.server.log.debug(obj, message, ...args);
  }

  warn(obj: unknown, message?: string, ...args: unknown[]) {
    this.server.log.warn(obj, message, ...args);
  }

  error(message: string, ...args: unknown[]) {
    this.server.log.error(message, ...args);
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
