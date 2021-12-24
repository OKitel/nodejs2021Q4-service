import { boardsRepo } from './board.memory.repository';
import { tasksRepo } from '../tasks/task.memory.repository';
import { Board } from './board.model';
import { BoardNotFound } from '../../errors/BoardNotFound';

/**
 * Returns all boards
 * @returns array of all boards
 */
const getAll = async (): Promise<Board[]> => {
  const boards = await boardsRepo.getAll();
  return boards;
};

/**
 * Returns the single board by ID
 * @param id - board ID
 * @throws an error if a board with a passed ID hasn't been found
 * @returns board by ID
 */
const getOne = async (id: string): Promise<Board> => {
  const board = await boardsRepo.getOne(id);
  if (!board) {
    throw new BoardNotFound(id);
  }
  return board;
};

/**
 * Delete board by ID
 * @param id - board ID
 * @returns this function doesn't return any value
 */
const deleteById = async (id: string): Promise<void> => {
  await tasksRepo.deleteTasksByBoardId(id);
  await boardsRepo.deleteById(id);
};

/**
 * Save board
 * @param board - see type {@link Board}
 * @returns this function doesn't return any value
 */
const save = async (board: Board): Promise<void> => {
  await boardsRepo.save(board);
};

/**
 * Update board by ID
 * @param board - see type {@link Board}
 * @throws an error if a board with a passed ID hasn't been found
 * @returns updated board
 */
const update = async (board: Board): Promise<Board> => {
  const oldBoard = await boardsRepo.getOne(board.id);
  if (!oldBoard) {
    throw new BoardNotFound(board.id);
  }
  const updatedBoard = await boardsRepo.update(board);
  return updatedBoard;
};

export const boardsService = { getAll, getOne, deleteById, save, update };
