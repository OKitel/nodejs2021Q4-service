const {
  getTasks,
  getTask,
  addTask,
  deleteTask,
  updateTask,
} = require('../resources/tasks/task.controller');

const Task = require('../dto/Task.model');

const getTasksOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Task,
      },
    },
  },
  handler: getTasks,
};

const getTaskOpts = {
  schema: {
    response: {
      200: Task,
    },
  },
  handler: getTask,
};

const postTaskOpts = {
  schema: {
    body: {
      type: 'object',
      required: [
        'title',
        'order',
        'description',
        'userId',
        'boardId',
        'columnId',
      ],
      properties: {
        title: { type: 'string' },
        order: { type: 'number' },
        description: { type: 'string' },
        userId: { type: 'string' },
        boardId: { type: 'string' },
        columnId: { type: 'string' },
      },
    },
    response: {
      201: Task,
    },
  },
  handler: addTask,
};

const deleteTaskOpts = {
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
  handler: deleteTask,
};

const updateTaskOpts = {
  schema: {
    response: {
      200: Task,
    },
  },
  handler: updateTask,
};

function taskRoutes(fastify, options, done) {
  // Get all tasks on the board
  fastify.get('/boards/:boardId/tasks', getTasksOpts);

  // Get the single task on the board by id
  fastify.get('/boards/:boardId/tasks/:taskId', getTaskOpts);

  // Add task
  fastify.post('/boards/:boardId/tasks', postTaskOpts);

  // Delete task
  fastify.delete('/boards/:boardId/tasks/:taskId', deleteTaskOpts);

  // Update board
  fastify.put('/boards/:boardId/tasks/:taskId', updateTaskOpts);

  done();
}

module.exports = taskRoutes;
