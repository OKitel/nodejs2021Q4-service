const fastify = require('fastify')({ logger: true });
const uuid = require('uuid');
const User = require('./user.model');
const usersService = require('./user.service');

const getUsers = async (req, reply) => {
  reply.send(await usersService.getAll());
};

const getUser = async (req, reply) => {
  const { id } = req.params;
  if (!id || !uuid.validate(id)) {
    return reply.code(400).send({ message: `Incorrect ID format.` });
  }
  try {
    const user = await usersService.getOne(id);
    return reply
      .code(200)
      .header('Content-Type', 'application/json')
      .send(user);
  } catch (error) {
    fastify.log.error(error);
    return reply.code(404).send({ message: `${error}.` });
  }
};

const addUser = async (req, reply) => {
  try {
    const { name, login, password } = req.body;
    const user = new User({ name, login, password });
    await usersService.save(user);
    reply.code(201).send(user);
  } catch (error) {
    fastify.log.error(error);
    reply.send({ message: `${error}` });
  }
};

const deleteUser = async (req, reply) => {
  const { id } = req.params;
  if (!id || !uuid.validate(id)) {
    reply.code(400).send({ message: `Incorrect ID format.` });
  }
  try {
    await usersService.deleteById(id);
    reply.send({ message: `User ${id} has been removed` });
  } catch (error) {
    fastify.log.error(error);
    reply.code(404).send({ message: `${error}` });
  }
};

const updateUser = async (req, reply) => {
  const { id } = req.params;
  if (!id || !uuid.validate(id)) {
    reply.code(400).send({ message: `Incorrect ID format.` });
  }
  try {
    const { name, login, password } = req.body;
    const user = await usersService.update({ id, name, login, password });
    reply.code(200).send(user);
  } catch (error) {
    fastify.log.error(error);
    reply.code(404).send({ message: `${error}` });
  }
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  deleteUser,
  updateUser,
};
