import { FastifyInstance, FastifyRequest } from 'fastify';

/**
 * Utility class for logging
 */
export class Logger {
  server: FastifyInstance;

  /**
   * Constructor for Logger instance
   * @param fastify - fastify instance
   * @returns a new {@link Logger} instance
   */

  constructor(fastify: FastifyInstance) {
    this.server = fastify;
  }

  /**
   * Log message with level INFO
   * @param req - fastify request
   * @param obj - any object
   * @param message - log message
   * @param args - rest of args
   */
  static info(
    req: FastifyRequest,
    obj: unknown,
    message: string,
    ...args: unknown[]
  ): void {
    req.log.info(obj, message, ...args);
  }

  /**
   * Log message with level TRACE
   * @param req - fastify request
   * @param obj - any object
   * @param message - log message
   * @param args - rest of args
   */
  static trace(
    req: FastifyRequest,
    obj: unknown,
    message: string,
    ...args: unknown[]
  ): void {
    req.log.trace(obj, message, ...args);
  }

  /**
   * Log message with level DEBUG
   * @param obj - any object
   * @param message - log message
   * @param args - rest args
   */
  debug(obj: unknown, message?: string, ...args: unknown[]): void {
    this.server.log.debug(obj, message, ...args);
  }

  /**
   * Log message with level WARN
   * @param obj - any object
   * @param message - log message
   * @param args - rest args
   */
  warn(obj: unknown, message?: string, ...args: unknown[]): void {
    this.server.log.warn(obj, message, ...args);
  }

  /**
   * Log message with level ERROR
   * @param message - log message
   * @param args - rest args
   */
  error(message: string, ...args: unknown[]): void {
    this.server.log.error(message, ...args);
  }

  /**
   * Add hooks 'preHandler' and 'onResponse' for working with request(add body and query strings to log) and calculating response duration
   */
  configureRequestLogging(): void {
    this.server.addHook('preHandler', (req, _, done) => {
      if (req.body) {
        Logger.info(req, { body: req.body }, 'parsed body');
      }
      Logger.info(req, { query: req.query }, 'request query string');
      Logger.info(req, { params: req.params }, 'path params');
      done();
    });
    this.server.addHook('onResponse', (req, reply, done) => {
      Logger.trace(
        req,
        {
          url: req.raw.url,
          statusCode: reply.raw.statusCode,
          durationMs: reply.getResponseTime(),
        },
        'request completed'
      );
      done();
    });
  }
}
