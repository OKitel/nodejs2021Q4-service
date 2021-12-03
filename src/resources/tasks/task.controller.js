const fastify = require('fastify')({ logger: true });
const uuid = require('uuid');
const Task = require('./task.model');
const tasksService = require('./task.service');

const getTasks = async (req, reply) => {
  const { boardId } = req.params;
  reply.send(await tasksService.getAllTasksByBoardId(boardId));
};

const getTask = async (req, reply) => {
  const { boardId, taskId } = req.params;
  if (
    !boardId ||
    !uuid.validate(boardId) ||
    !taskId ||
    !uuid.validate(taskId)
  ) {
    return reply.code(400).send({ message: `Incorrect ID format.` });
  }
  try {
    const task = await tasksService.getOne(boardId, taskId);
    return reply
      .code(200)
      .header('Content-Type', 'application/json')
      .send(task);
  } catch (error) {
    fastify.log.error(error);
    return reply.code(404).send({ message: `${error}.` });
  }
};

const addTask = async (req, reply) => {
  try {
    const { title, order, description, userId, boardId, columnId } = req.body;
    const task = new Task({
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    });
    await tasksService.save(task);
    reply.code(201).send(task);
  } catch (error) {
    fastify.log.error(error);
    reply.send({ message: `${error}` });
  }
};

const deleteTask = async (req, reply) => {
  const { boardId, taskId } = req.params;
  if (
    !boardId ||
    !uuid.validate(boardId) ||
    !taskId ||
    !uuid.validate(taskId)
  ) {
    reply.code(400).send({ message: `Incorrect ID format.` });
  }
  try {
    await tasksService.deleteById(taskId);
    reply.send({ message: `Task ${taskId} has been removed` });
  } catch (error) {
    fastify.log.error(error);
    reply.code(404).send({ message: `${error}` });
  }
};

const updateTask = async (req, reply) => {
  const { boardId: boardIdParam, taskId } = req.params;
  if (
    !boardIdParam ||
    !uuid.validate(boardIdParam) ||
    !taskId ||
    !uuid.validate(taskId)
  ) {
    reply.code(400).send({ message: `Incorrect ID format.` });
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
    reply.code(200).send(task);
  } catch (error) {
    fastify.log.error(error);
    reply.code(404).send({ message: `${error}` });
  }
};

module.exports = {
  getTasks,
  getTask,
  addTask,
  deleteTask,
  updateTask,
};
