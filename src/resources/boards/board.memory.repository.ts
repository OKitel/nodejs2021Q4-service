import { getConnection, getRepository } from 'typeorm';
import { Board } from './board.model';

// let boards: Array<Board> = [
//   {
//     id: 'cd3a4828-1334-4dce-920f-6bd89af1539a',
//     title: 'Board #1',
//     columns: [1, 2, 3],
//   },
//   {
//     id: 'cd3a4828-1334-4dce-920f-6bd89af1539b',
//     title: 'Board #2',
//     columns: [1, 2, 3],
//   },
//   {
//     id: 'cd3a4828-1334-4dce-920f-6bd89af1539c',
//     title: 'Board #3',
//     columns: [1, 2],
//   },
// ];

/**
 * Returns all boards from boards repository
 * @returns array of all boards
 */
const getAll = async (): Promise<Board[]> => {
  const boards = await getRepository(Board)
    .createQueryBuilder('board')
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
 * @param updatedBoard - new info for board, see type {@link Board}
 * @returns updated board
 */
const update = async (updatedBoard: Board): Promise<Board> => {
  await getConnection()
    .createQueryBuilder()
    .update(Board)
    .set(updatedBoard)
    .where('id = :id', { id: updatedBoard.id })
    .execute();
  return updatedBoard;
};

export const boardsRepo = { getAll, getOne, deleteById, save, update };
