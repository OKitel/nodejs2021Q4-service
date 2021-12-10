import { FastifyError, FastifyInstance } from 'fastify';
import { User, UserToResponse } from '../dto/User.model';

import {
  getUsers,
  getUser,
  addUser,
  deleteUser,
  updateUser,
} from '../resources/users/user.controller';

const getUsersOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: UserToResponse,
      },
    },
  },
  handler: getUsers,
};

const getUserOpts = {
  schema: {
    response: {
      200: UserToResponse,
    },
  },
  handler: getUser,
};

const postUserOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['name', 'login', 'password'],
      properties: {
        name: { type: 'string' },
        login: { type: 'string' },
        password: { type: 'string' },
      },
    },
    response: {
      201: UserToResponse,
    },
  },
  handler: addUser,
};

const deleteUserOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
  handler: deleteUser,
};

const updateUserOpts = {
  schema: {
    response: {
      200: User,
    },
  },
  handler: updateUser,
};

/**
 * Declares routes for users
 * @param fastify - see type {@link FastifyInstance}
 * @param done - function to complete registration of users routes
 */
export const userRoutes = (
  fastify: FastifyInstance,
  _: unknown,
  done: (err?: FastifyError) => void
) => {
  // Get all users
  fastify.get('/users', getUsersOpts);

  // Get single user
  fastify.get('/users/:id', getUserOpts);

  // Add user
  fastify.post('/users', postUserOpts);

  // Delete user
  fastify.delete('/users/:id', deleteUserOpts);

  // Update user
  fastify.put('/users/:id', updateUserOpts);

  done();
};
