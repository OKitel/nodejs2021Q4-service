import { FastifyInstance } from 'fastify';
import { Logger } from '../logger';
import { verifyToken } from './tokenUtils';

/**
 * This function verify user token in each request for routes that starts from '/boards' or '/users'
 * @param server - an instance of Fastify server {@link FastifyInstance}
 * @returns this function doesn't return any value
 */
export const fastifyTokenVerifier = (server: FastifyInstance): void => {
  server.addHook('preHandler', async (req) => {
    if (req.url.startsWith('/boards') || req.url.startsWith('/users')) {
      const userData = await verifyToken(req.headers.authorization);
      Logger.info(
        req,
        userData,
        `User with login ${userData.login} successfully authorized`
      );
    }
  });
};
