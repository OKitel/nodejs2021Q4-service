import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { validate as uuidValidate } from 'uuid';
import { User } from './user.model';
import { usersService } from './user.service';

export const server = fastify({ logger: true });

type UserRequestPost = FastifyRequest<{
  Body: { name: string; login: string; password: string };
}>;
type UserRequestPut = FastifyRequest<{ Params: { id: string }; Body: User }>;
type UserRequestParams = FastifyRequest<{ Params: { id: string } }>;

export const getUsers = async (req: FastifyRequest, reply: FastifyReply) => {
  reply.send(await usersService.getAll());
};

export const getUser = async (req: UserRequestParams, reply: FastifyReply) => {
  const { id } = req.params;
  if (!id || !uuidValidate(id)) {
    return reply
      .code(400)
      .header('Content-Type', 'application/json')
      .send({ message: `Incorrect ID format.` });
  }
  try {
    const user = await usersService.getOne(id);
    return reply
      .code(200)
      .header('Content-Type', 'application/json')
      .send(user);
  } catch (error) {
    server.log.error(error);
    return reply
      .code(404)
      .header('Content-Type', 'application/json')
      .send({ message: `${error}.` });
  }
};

export const addUser = async (req: UserRequestPost, reply: FastifyReply) => {
  try {
    const { name, login, password } = req.body;
    const user = new User({ name, login, password });
    await usersService.save(user);
    reply.code(201).header('Content-Type', 'application/json').send(user);
  } catch (error) {
    server.log.error(error);
    reply
      .code(404)
      .header('Content-Type', 'application/json')
      .send({ message: `${error}` });
  }
};

export const deleteUser = async (
  req: UserRequestParams,
  reply: FastifyReply
) => {
  const { id } = req.params;
  if (!id || !uuidValidate(id)) {
    reply
      .code(400)
      .header('Content-Type', 'application/json')
      .send({ message: `Incorrect ID format.` });
  }
  try {
    await usersService.deleteById(id);
    reply.send({ message: `User ${id} has been removed` });
  } catch (error) {
    server.log.error(error);
    reply
      .code(404)
      .header('Content-Type', 'application/json')
      .send({ message: `${error}` });
  }
};

export const updateUser = async (req: UserRequestPut, reply: FastifyReply) => {
  const { id } = req.params;
  if (!id || !uuidValidate(id)) {
    reply
      .code(400)
      .header('Content-Type', 'application/json')
      .send({ message: `Incorrect ID format.` });
  }
  try {
    const { name, login, password } = req.body;
    const user = await usersService.update({ id, name, login, password });
    reply.code(200).header('Content-Type', 'application/json').send(user);
  } catch (error) {
    server.log.error(error);
    reply
      .code(404)
      .header('Content-Type', 'application/json')
      .send({ message: `${error}` });
  }
};
