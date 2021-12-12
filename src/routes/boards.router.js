const {
  getBoards,
  getBoard,
  addBoard,
  deleteBoard,
  updateBoard,
} = require('../resources/boards/board.controller');

const Board = require('../dto/Board.model');

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

function boardRoutes(fastify, options, done) {
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
}

module.exports = boardRoutes;
