import { FastifyInstance } from 'fastify';
import {
  getTasks,
  getTask,
  addTask,
  deleteTask,
  updateTask,
} from '../resources/tasks/task.controller';

import { Task } from '../dto/Task.model';

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
      required: ['title', 'order', 'description'],
      properties: {
        title: { type: 'string' },
        order: { type: 'number' },
        description: { type: 'string' },
        userId: { type: 'string', nullable: true },
        boardId: { type: 'string' },
        columnId: { type: 'string', nullable: true },
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

/**
 * Declares routes for tasks
 * @param fastify - see type {@link FastifyInstance}
 * @param done - function to complete registration of tasks routes
 * @returns this function doesn't return any value
 */
export const taskRoutes = (
  fastify: FastifyInstance,
  _: unknown,
  done: () => void
): void => {
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
};
