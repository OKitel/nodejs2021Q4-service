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

/**
 * Returns all users in response
 * @param _ - fastify request, see {@link FastifyRequest}
 * @param reply - fastify reply, contains an array of all users
 * @returns this function doesn't return any value
 */
export const getUsers = async (
  _: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  reply.send(await usersService.getAll());
};

/**
 * Returns single user by ID in response
 * @param req - fastify request with user ID, see {@link UserRequestParams}
 * @param reply - fastify reply, contains single user
 * @returns this function doesn't return any value
 */
export const getUser = async (
  req: UserRequestParams,
  reply: FastifyReply
): Promise<void> => {
  const { id } = req.params;
  if (!id || !uuidValidate(id)) {
    reply
      .code(400)
      .header('Content-Type', 'application/json')
      .send({ message: `Incorrect ID format.` });
  }
  try {
    const user = await usersService.getOne(id);
    reply.code(200).header('Content-Type', 'application/json').send(user);
  } catch (error: unknown) {
    server.log.error(error);
    reply
      .code(404)
      .header('Content-Type', 'application/json')
      .send({ message: `${error}.` });
  }
};

/**
 * Save user
 * @param req - fastify request with new user info, see {@link UserRequestPost}
 * @param reply - fastify reply, contains new user
 * @returns this function doesn't return any value
 */
export const addUser = async (
  req: UserRequestPost,
  reply: FastifyReply
): Promise<void> => {
  try {
    const { name, login, password } = req.body;
    const user = new User({ name, login, password });
    await usersService.save(user);
    reply.code(201).header('Content-Type', 'application/json').send(user);
  } catch (error: unknown) {
    server.log.error(error);
    reply
      .code(404)
      .header('Content-Type', 'application/json')
      .send({ message: `${error}` });
  }
};

/**
 * Delete user by ID
 * @param req - fastify request with user ID, see {@link UserRequestParams}
 * @param reply - fastify reply, contains message that user with passed has been removed
 * @returns this function doesn't return any value
 */
export const deleteUser = async (
  req: UserRequestParams,
  reply: FastifyReply
): Promise<void> => {
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
  } catch (error: unknown) {
    server.log.error(error);
    reply
      .code(404)
      .header('Content-Type', 'application/json')
      .send({ message: `${error}` });
  }
};

/**
 * Update user
 * @param req - fastify request with ID and updated user info, see {@link UserRequestPut}
 * @param reply - fastify reply, contains updated user
 * @returns this function doesn't return any value
 */
export const updateUser = async (
  req: UserRequestPut,
  reply: FastifyReply
): Promise<void> => {
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
  } catch (error: unknown) {
    server.log.error(error);
    reply
      .code(404)
      .header('Content-Type', 'application/json')
      .send({ message: `${error}` });
  }
};
