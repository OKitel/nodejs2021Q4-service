const fastify = require('fastify')({ logger: true });
const uuid = require('uuid');
const Task = require('./task.model');
const tasksService = require('./task.service');

const checkId = (boardId, taskId) => {
  if (
    !boardId ||
    !uuid.validate(boardId) ||
    !taskId ||
    !uuid.validate(taskId)
  ) {
    return true;
  }
  return false;
};

const getTasks = async (req, reply) => {
  const { boardId } = req.params;
  if (!boardId || !uuid.validate(boardId)) {
    return reply
      .code(400)
      .header('Content-Type', 'application/json')
      .send({ message: `Incorrect ID format.` });
  }
  try {
    return reply.send(await tasksService.getAllTasksByBoardId(boardId));
  } catch (error) {
    fastify.log.error(error);
    return reply
      .code(404)
      .header('Content-Type', 'application/json')
      .send({ message: `${error}` });
  }
};

const getTask = async (req, reply) => {
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
    fastify.log.error(error);
    return reply
      .code(404)
      .header('Content-Type', 'application/json')
      .send({ message: `${error}.` });
  }
};

const addTask = async (req, reply) => {
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
    fastify.log.error(error);
    return reply
      .code(404)
      .header('Content-Type', 'application/json')
      .send({ message: `${error}` });
  }
};

const deleteTask = async (req, reply) => {
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
    fastify.log.error(error);
    reply
      .code(404)
      .header('Content-Type', 'application/json')
      .send({ message: `${error}` });
  }
};

const updateTask = async (req, reply) => {
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
    fastify.log.error(error);
    reply
      .code(404)
      .header('Content-Type', 'application/json')
      .send({ message: `${error}` });
  }
};

module.exports = {
  getTasks,
  getTask,
  addTask,
  deleteTask,
  updateTask,
};
