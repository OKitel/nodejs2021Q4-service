const fastify = require('fastify')({ logger: true });
const uuid = require('uuid');
const Board = require('./board.model');
const boardsService = require('./board.service');

const getBoards = async (req, reply) => {
  reply.send(await boardsService.getAll());
};

const getBoard = async (req, reply) => {
  const { id } = req.params;
  if (!id || !uuid.validate(id)) {
    return reply.code(400).send({ message: `Incorrect ID format.` });
  }
  try {
    const board = await boardsService.getOne(id);
    return reply
      .code(200)
      .header('Content-Type', 'application/json')
      .send(board);
  } catch (error) {
    fastify.log.error(error);
    return reply.code(404).send({ message: `${error}.` });
  }
};

const addBoard = async (req, reply) => {
  try {
    const { title, columns } = req.body;
    const board = new Board({ title, columns });
    await boardsService.save(board);
    reply.code(201).send(board);
  } catch (error) {
    fastify.log.error(error);
    reply.send({ message: `${error} ` });
  }
};

const deleteBoard = async (req, reply) => {
  const { id } = req.params;
  if (!id || !uuid.validate(id)) {
    reply.code(400).send({ message: `Incorrect ID format.` });
  }
  try {
    await boardsService.deleteById(id);
    reply.send({ message: `Board ${id} has been removed` });
  } catch (error) {
    fastify.log.error(error);
    reply.code(404).send({ message: `There is an error: ${error} ` });
  }
};

const updateBoard = async (req, reply) => {
  const { id } = req.params;
  if (!id || !uuid.validate(id)) {
    reply.code(400).send({ message: `Incorrect ID format.` });
  }
  try {
    const { title, columns } = req.body;
    const board = await boardsService.update({ id, title, columns });
    reply.code(200).send(board);
  } catch (error) {
    fastify.log.error(error);
    reply.code(404).send({ message: `There is an error: ${error} ` });
  }
};

module.exports = {
  getBoards,
  getBoard,
  addBoard,
  deleteBoard,
  updateBoard,
};
