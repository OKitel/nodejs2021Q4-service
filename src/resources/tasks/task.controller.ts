import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { validate as uuidValidate } from 'uuid';
import { Task } from './task.model';
import { tasksService } from './task.service';

const server = fastify({ logger: true });

type TaskRequestPost = FastifyRequest<{
  Params: { boardId: string };
  Body: {
    title: string;
    order: number;
    description: string;
    userId: string | null;
    columnId: null | number;
  };
}>;
type TaskRequestPut = FastifyRequest<{
  Params: { boardId: string; taskId: string };
  Body: {
    title: string;
    order: number;
    description: string;
    userId: string | null;
    columnId: null | number;
    boardId: string;
  };
}>;
type TaskRequestParams = FastifyRequest<{
  Params: { boardId: string; taskId: string };
}>;

/**
 * Checks if board ID and task ID are existing and valid
 * @param boardId board ID
 * @param taskId task ID
 * @returns true if all checks passed or false if not
 */
export const checkId = (boardId: string, taskId: string) => {
  if (!boardId || !uuidValidate(boardId) || !taskId || !uuidValidate(taskId)) {
    return true;
  }
  return false;
};

/**
 * Returns all tasks
 * @param req fastify request with board ID, see {@link TaskRequestParams}
 * @param reply fastify reply, contains an array of tasks from one board, see {@link FastifyReply}
 * @returns an array of tasks
 */
export const getTasks = async (req: TaskRequestParams, reply: FastifyReply) => {
  const { boardId } = req.params;
  if (!boardId || !uuidValidate(boardId)) {
    return reply
      .code(400)
      .header('Content-Type', 'application/json')
      .send({ message: `Incorrect ID format.` });
  }
  try {
    return reply.send(await tasksService.getAllTasksByBoardId(boardId));
  } catch (error) {
    server.log.error(error);
    return reply
      .code(404)
      .header('Content-Type', 'application/json')
      .send({ message: `${error}` });
  }
};

/**
 * Returns task by ID from the board
 * @param req fastify request with board ID, see {@link TaskRequestParams}
 * @param reply fastify reply, contains task
 * @returns task by ID
 */
export const getTask = async (req: TaskRequestParams, reply: FastifyReply) => {
  const { boardId, taskId } = req.params;
  if (checkId(boardId, taskId)) {
    return reply
      .code(400)
      .header('Content-Type', 'application/json')
      .send({ message: `Incorrect ID format.` });
  }
  try {
    const task = await tasksService.getOne(boardId, taskId);
    return reply
      .code(200)
      .header('Content-Type', 'application/json')
      .send(task);
  } catch (error) {
    server.log.error(error);
    return reply
      .code(404)
      .header('Content-Type', 'application/json')
      .send({ message: `${error}.` });
  }
};

/**
 * Save new task
 * @param req fastify request with board ID and new task info, see {@link TaskRequestPost}
 * @param reply fastify reply, contains just saved task witn generated ID
 * @returns saved task with ID
 */
export const addTask = async (req: TaskRequestPost, reply: FastifyReply) => {
  const { boardId } = req.params;
  try {
    const { title, order, description, userId, columnId } = req.body;
    const task = new Task({
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    });
    await tasksService.save(task);
    return reply
      .code(201)
      .header('Content-Type', 'application/json')
      .send(task);
  } catch (error) {
    server.log.error(error);
    return reply
      .code(404)
      .header('Content-Type', 'application/json')
      .send({ message: `${error}` });
  }
};

/**
 * Delete task by ID
 * @param req fastify request with board ID, see {@link TaskRequestParams}
 * @param reply fastify reply, contains message that task with passed ID has been removed
 */
export const deleteTask = async (
  req: TaskRequestParams,
  reply: FastifyReply
) => {
  const { boardId, taskId } = req.params;
  if (checkId(boardId, taskId)) {
    reply
      .code(400)
      .header('Content-Type', 'application/json')
      .send({ message: `Incorrect ID format.` });
  }
  try {
    await tasksService.deleteById(taskId);
    reply.send({ message: `Task ${taskId} has been removed` });
  } catch (error) {
    server.log.error(error);
    reply
      .code(404)
      .header('Content-Type', 'application/json')
      .send({ message: `${error}` });
  }
};

/**
 * Update task
 * @param req fastify request with board ID and new task info, see {@link TaskRequestPut}
 * @param reply fastify reply, contains updated task
 */
export const updateTask = async (req: TaskRequestPut, reply: FastifyReply) => {
  const { boardId: boardIdParam, taskId } = req.params;
  if (checkId(boardIdParam, taskId)) {
    reply
      .code(400)
      .header('Content-Type', 'application/json')
      .send({ message: `Incorrect ID format.` });
  }
  try {
    const { title, order, description, userId, boardId, columnId } = req.body;
    const task = await tasksService.update({
      id: taskId,
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    });
    reply.code(200).header('Content-Type', 'application/json').send(task);
  } catch (error) {
    server.log.error(error);
    reply
      .code(404)
      .header('Content-Type', 'application/json')
      .send({ message: `${error}` });
  }
};
