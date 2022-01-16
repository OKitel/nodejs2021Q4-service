import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { validate as uuidValidate } from 'uuid';
import { IncorrectIdFormatError } from '../../errors/IncorrectIdFormatError';
import { tasksService } from './task.service';

type TaskRequestPost = FastifyRequest<{
  Params: { boardId: string };
  Body: {
    title: string;
    order: number;
    description: string;
    userId: string | null;
    columnId: null | string;
  };
}>;
type TaskRequestPut = FastifyRequest<{
  Params: { boardId: string; taskId: string };
  Body: {
    title: string;
    order: number;
    description: string;
    userId: string | null;
    columnId: null | string;
    boardId: string;
  };
}>;
type TaskRequestParams = FastifyRequest<{
  Params: { boardId: string; taskId: string };
}>;

/**
 * Checks if board ID and task ID are existing and valid
 * @param boardId - board ID
 * @param taskId - task ID
 * @returns true if all checks passed or false if not
 */
export const checkId = (boardId: string, taskId: string): boolean => {
  if (!boardId || !uuidValidate(boardId) || !taskId || !uuidValidate(taskId)) {
    return true;
  }
  return false;
};

/**
 * Returns all tasks in response
 * @param req - fastify request with board ID, see {@link TaskRequestParams}
 * @param reply - fastify reply, contains an array of tasks from one board, see {@link FastifyReply}
 * @throws IncorrectIdFormatError when id format is invalid
 * @returns this function doesn't return any value
 */
export const getTasks = async (
  req: TaskRequestParams,
  reply: FastifyReply
): Promise<void> => {
  const { boardId } = req.params;
  if (!boardId || !uuidValidate(boardId)) {
    throw new IncorrectIdFormatError();
  }
  const tasks = await tasksService.getAllTasksByBoardId(boardId);
  reply.send(tasks);
};

/**
 * Returns task by ID from the board in response
 * @param req - fastify request with board ID, see {@link TaskRequestParams}
 * @param reply - fastify reply, contains task
 * @throws IncorrectIdFormatError when id format is invalid
 * @returns this function doesn't return any value
 */
export const getTask = async (
  req: TaskRequestParams,
  reply: FastifyReply
): Promise<void> => {
  const { boardId, taskId } = req.params;
  if (checkId(boardId, taskId)) {
    throw new IncorrectIdFormatError();
  }
  const task = await tasksService.getOne(boardId, taskId);
  reply
    .code(StatusCodes.OK)
    .header('Content-Type', 'application/json')
    .send(task);
};

/**
 * Save new task
 * @param req - fastify request with board ID and new task info, see {@link TaskRequestPost}
 * @param reply - fastify reply, contains just saved task witn generated ID
 * @returns this function doesn't return any value
 */
export const addTask = async (
  req: TaskRequestPost,
  reply: FastifyReply
): Promise<void> => {
  const { boardId } = req.params;
  const { title, order, description, userId, columnId } = req.body;
  const task = await tasksService.save({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  });
  reply
    .code(StatusCodes.CREATED)
    .header('Content-Type', 'application/json')
    .send(task);
};

/**
 * Delete task by ID
 * @param req - fastify request with board ID, see {@link TaskRequestParams}
 * @param reply - fastify reply, contains message that task with passed ID has been removed
 * @throws IncorrectIdFormatError when id format is invalid
 * @returns this function doesn't return any value
 */
export const deleteTask = async (
  req: TaskRequestParams,
  reply: FastifyReply
): Promise<void> => {
  const { boardId, taskId } = req.params;
  if (checkId(boardId, taskId)) {
    throw new IncorrectIdFormatError();
  }
  await tasksService.deleteById(taskId);
  reply.send({ message: `Task ${taskId} has been removed` });
};

/**
 * Update task
 * @param req - fastify request with board ID and new task info, see {@link TaskRequestPut}
 * @param reply - fastify reply, contains updated task
 * @throws IncorrectIdFormatError when id format is invalid
 * @returns this function doesn't return any value
 */
export const updateTask = async (
  req: TaskRequestPut,
  reply: FastifyReply
): Promise<void> => {
  const { boardId: boardIdParam, taskId } = req.params;
  if (checkId(boardIdParam, taskId)) {
    throw new IncorrectIdFormatError();
  }
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
  reply
    .code(StatusCodes.OK)
    .header('Content-Type', 'application/json')
    .send(task);
};
