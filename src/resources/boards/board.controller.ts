import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { validate as uuidValidate } from 'uuid';
import { Board } from './board.model';
import { boardsService } from './board.service';

const server = fastify({ logger: true });

type BoardRequestPost = FastifyRequest<{
  Body: { title: string; columns: Array<number> };
}>;
type BoardRequestPut = FastifyRequest<{ Params: { id: string }; Body: Board }>;
type BoardRequestParams = FastifyRequest<{ Params: { id: string } }>;

/**
 * Return all boards
 * @param _ - fastify request
 * @param reply - fastify reply, contains an array of boards, see {@link FastifyReply}
 */
export const getBoards = async (_: FastifyRequest, reply: FastifyReply) => {
  reply.send(await boardsService.getAll());
};

/**
 * Return the single board by ID
 * @param req - fastify request with ID, see {@link BoardRequestParams}
 * @param reply - fastify reply, contains single board
 * @returns single board by ID as fastify reply
 */
export const getBoard = async (
  req: BoardRequestParams,
  reply: FastifyReply
) => {
  const { id } = req.params;
  if (!id || !uuidValidate(id)) {
    return reply
      .code(400)
      .header('Content-Type', 'application/json')
      .send({ message: `Incorrect ID format.` });
  }
  try {
    const board = await boardsService.getOne(id);
    return reply
      .code(200)
      .header('Content-Type', 'application/json')
      .send(board);
  } catch (error) {
    server.log.error(error);
    return reply
      .code(404)
      .header('Content-Type', 'application/json')
      .send({ message: `${error}.` });
  }
};

/**
 * Add a new board
 * @param req - fastify request with ID and new board info, see {@link BoardRequestPost}
 * @param reply - fastify reply, contains just added new board
 */
export const addBoard = async (req: BoardRequestPost, reply: FastifyReply) => {
  try {
    const { title, columns } = req.body;
    const board = new Board({ title, columns });
    await boardsService.save(board);
    reply.code(201).header('Content-Type', 'application/json').send(board);
  } catch (error) {
    server.log.error(error);
    reply
      .code(404)
      .header('Content-Type', 'application/json')
      .send({ message: `${error} ` });
  }
};

/**
 * Delete the board by ID
 * @param req - fastify request with ID, see {@link BoardRequestParams}
 * @param reply - fastify reply, contains message that board with ID from params was deleted
 */
export const deleteBoard = async (
  req: BoardRequestParams,
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
    await boardsService.deleteById(id);
    reply.send({ message: `Board ${id} has been removed` });
  } catch (error) {
    server.log.error(error);
    reply
      .code(404)
      .header('Content-Type', 'application/json')
      .send({ message: `There is an error: ${error} ` });
  }
};

/**
 * Update the board by ID
 * @param req - fastify request with ID, see {@link BoardRequestPut}
 * @param reply - fastify reply, contains updated board
 */
export const updateBoard = async (
  req: BoardRequestPut,
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
    const { title, columns } = req.body;
    const board = await boardsService.update({ id, title, columns });
    reply.code(200).header('Content-Type', 'application/json').send(board);
  } catch (error) {
    server.log.error(error);
    reply
      .code(404)
      .header('Content-Type', 'application/json')
      .send({ message: `There is an error: ${error} ` });
  }
};
