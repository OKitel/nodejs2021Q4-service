import { getConnection, getRepository } from 'typeorm';
import { Board } from './board.model';

/**
 * Returns all boards from boards repository
 * @returns array of all boards
 */
const getAll = async (): Promise<Board[]> => {
  const boards = await getRepository(Board)
    .createQueryBuilder('board')
    .leftJoinAndSelect('board.columns', 'bc')
    .getMany();
  return boards;
};

/**
 * Returns the single board by ID from boards repository
 * @param id - board ID
 * @returns board by ID or undefined if board wasn't found
 */
const getOne = async (id: string): Promise<Board | undefined> => {
  const board = await getRepository(Board)
    .createQueryBuilder('board')
    .leftJoinAndSelect('board.columns', 'bc')
    .where('board.id = :id', { id })
    .getOne();
  return board;
};

/**
 * Delete board by ID from boards repository
 * @param id - board ID
 * @returns this function doesn't return any value
 */
const deleteById = async (id: string): Promise<void> => {
  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Board)
    .where('id = :id', { id })
    .execute();
};

/**
 * Save board to boards repository
 * @param board - see type {@link Board}
 * @returns just saved board
 */
const save = async (board: Board): Promise<Board> => {
  await getRepository(Board)
    .createQueryBuilder()
    .insert()
    .values(board)
    .execute();
  return board;
};

/**
 * Update board by ID into boards repository
 * @param board - new info for board, see type {@link Board}
 * @returns updated board
 */
const update = async (board: Board): Promise<Board> => {
  const updatedBoard = await getRepository(Board).save(board);
  return updatedBoard;
};

export const boardsRepo = { getAll, getOne, deleteById, save, update };
