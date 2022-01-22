import { FastifyInstance } from 'fastify';
import { Token } from '../dto/Token.model';
import { loginUser } from '../resources/login/login.controller';

const loginOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        items: Token,
      },
    },
  },
  handler: loginUser,
};

/**
 * Declares routes for login
 * @param fastify - see type {@link FastifyInstance}
 * @param done - function to complete registration of login route
 * @returns this function doesn't return any value
 */
export const loginRoute = (
  fastify: FastifyInstance,
  _: unknown,
  done: () => void
): void => {
  // Login user
  fastify.post('/login', loginOpts);

  done();
};
