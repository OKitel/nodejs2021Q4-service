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

export const checkId = (boardId: string, taskId: string) => {
  if (!boardId || !uuidValidate(boardId) || !taskId || !uuidValidate(taskId)) {
    return true;
  }
  return false;
};

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
