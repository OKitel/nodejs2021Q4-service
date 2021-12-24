import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { validate as uuidValidate } from 'uuid';
import { IncorrectIdFormatError } from '../../errors/IncorrectIdFormatError';
import { Board } from './board.model';
import { boardsService } from './board.service';

type BoardRequestPost = FastifyRequest<{
  Body: { title: string; columns: Array<number> };
}>;
type BoardRequestPut = FastifyRequest<{ Params: { id: string }; Body: Board }>;
type BoardRequestParams = FastifyRequest<{ Params: { id: string } }>;

/**
 * Return all boards in response
 * @param _ - fastify request
 * @param reply - fastify reply, contains an array of boards, see {@link FastifyReply}
 * @returns this function doesn't return any value
 */
export const getBoards = async (
  _: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  reply.send(await boardsService.getAll());
};

/**
 * Return the single board by ID in response
 * @param req - fastify request with ID, see {@link BoardRequestParams}
 * @param reply - fastify reply, contains single board
 * @returns this function doesn't return any value
 */
export const getBoard = async (
  req: BoardRequestParams,
  reply: FastifyReply
): Promise<void> => {
  const { id } = req.params;
  if (!id || !uuidValidate(id)) {
    throw new IncorrectIdFormatError();
  }
  const board = await boardsService.getOne(id);
  reply.code(StatusCodes.OK).header('Content-Type', 'application/json').send(board);
};

/**
 * Add a new board
 * @param req - fastify request with ID and new board info, see {@link BoardRequestPost}
 * @param reply - fastify reply, contains just added new board
 * @returns this function doesn't return any value
 */
export const addBoard = async (
  req: BoardRequestPost,
  reply: FastifyReply
): Promise<void> => {
  const { title, columns } = req.body;
  const board = new Board({ title, columns });
  await boardsService.save(board);
  reply.code(StatusCodes.CREATED).header('Content-Type', 'application/json').send(board);
};

/**
 * Delete the board by ID
 * @param req - fastify request with ID, see {@link BoardRequestParams}
 * @param reply - fastify reply, contains message that board with ID from params was deleted
 * @returns this function doesn't return any value
 */
export const deleteBoard = async (
  req: BoardRequestParams,
  reply: FastifyReply
): Promise<void> => {
  const { id } = req.params;
  if (!id || !uuidValidate(id)) {
    throw new IncorrectIdFormatError();
  }
  await boardsService.deleteById(id);
  reply.send({ message: `Board ${id} has been removed` });
};

/**
 * Update the board by ID
 * @param req - fastify request with ID, see {@link BoardRequestPut}
 * @param reply - fastify reply, contains updated board
 * @returns this function doesn't return any value
 */
export const updateBoard = async (
  req: BoardRequestPut,
  reply: FastifyReply
): Promise<void> => {
  const { id } = req.params;
  if (!id || !uuidValidate(id)) {
    throw new IncorrectIdFormatError();
  }
  const { title, columns } = req.body;
  const board = await boardsService.update({ id, title, columns });
  reply.code(StatusCodes.OK).header('Content-Type', 'application/json').send(board);
};
