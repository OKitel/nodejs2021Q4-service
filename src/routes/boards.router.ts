import { FastifyInstance } from 'fastify';
import {
  getBoards,
  getBoard,
  addBoard,
  deleteBoard,
  updateBoard,
} from '../resources/boards/board.controller';

import { Board } from '../dto/Board.model';

const getBoardsOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Board,
      },
    },
  },
  handler: getBoards,
};

const getBoardOpts = {
  schema: {
    response: {
      200: Board,
    },
  },
  handler: getBoard,
};

const postBoardOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['title', 'columns'],
      properties: {
        title: { type: 'string' },
        columns: { type: 'array' },
      },
    },
    response: {
      201: Board,
    },
  },
  handler: addBoard,
};

const deleteBoardOpts = {
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
  handler: deleteBoard,
};

const updateBoardOpts = {
  schema: {
    response: {
      200: Board,
    },
  },
  handler: updateBoard,
};

/**
 * Declares routes for boards
 * @param fastify - see type {@link FastifyInstance}
 * @param done - function to complete registration of board routes
 * @returns this function doesn't return any value
 */
export const boardRoutes = (
  fastify: FastifyInstance,
  _: unknown,
  done: () => void
): void => {
  // Get all boards
  fastify.get('/boards', getBoardsOpts);

  // Get single board
  fastify.get('/boards/:id', getBoardOpts);

  // Add board
  fastify.post('/boards', postBoardOpts);

  // Delete board
  fastify.delete('/boards/:id', deleteBoardOpts);

  // Update board
  fastify.put('/boards/:id', updateBoardOpts);

  done();
};
