const fastify = require('fastify')({ logger: true });
const uuid = require('uuid');
const Task = require('./task.model');
const tasksService = require('./task.service');

const getTasks = async (req, reply) => {
  const { boardId } = req.params;
  reply.send(await tasksService.getAllTasksByBoardId(boardId));
};

const getTask = async (req, reply) => {
  const { id } = req.params;
  if (!id || !uuid.validate(id)) {
    return reply.code(400).send({ message: `Incorrect ID format.` });
  }
  try {
    const task = await tasksService.getOne(id);
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
    const task = new Task(title, order, description, userId, boardId, columnId);
    await tasksService.save(task);
    reply.code(201).send(task);
  } catch (error) {
    fastify.log.error(error);
    reply.send({ message: `${error}` });
  }
};

const deleteTask = async (req, reply) => {
  const { id } = req.params;
  if (!id || !uuid.validate(id)) {
    reply.code(400).send({ message: `Incorrect ID format.` });
  }
  try {
    await tasksService.deleteById(id);
    reply.send({ message: `Task ${id} has been removed` });
  } catch (error) {
    fastify.log.error(error);
    reply.code(404).send({ message: `${error}` });
  }
};

const updateTask = async (req, reply) => {
  const { id } = req.params;
  if (!id || !uuid.validate(id)) {
    reply.code(400).send({ message: `Incorrect ID format.` });
  }
  try {
    const { title, order, description, userId, boardId, columnId } = req.body;
    const board = await tasksService.update({
      id,
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    });
    reply.code(200).send(board);
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
