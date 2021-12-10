import { boardsRepo } from './board.memory.repository';
import { tasksRepo } from '../tasks/task.memory.repository';
import { Board } from './board.model';

/**
 * Returns all boards
 * @returns all boards
 */
const getAll = async () => {
  const boards = await boardsRepo.getAll();
  return boards;
};

/**
 * Returns the single board by ID
 * @param id board ID
 * @throws an error if a board with a passed ID hasn't been found
 * @returns board by ID
 */
const getOne = async (id: string) => {
  const board = await boardsRepo.getOne(id);
  if (!board) {
    throw new Error(`The board with id ${id} hasn't been found`);
  }
  return board;
};

/**
 * Delete board by ID
 * @param id board ID
 */
const deleteById = async (id: string) => {
  await tasksRepo.deleteTasksByBoardId(id);
  await boardsRepo.deleteById(id);
};

/**
 * Save board
 * @param board see type {@link Board}
 */
const save = async (board: Board) => {
  await boardsRepo.save(board);
};

/**
 * Update board by ID
 * @param board see type {@link Board}
 * @throws an error if a board with a passed ID hasn't been found
 * @returns updated board
 */
const update = async (board: Board) => {
  const oldBoard = await boardsRepo.getOne(board.id);
  if (!oldBoard) {
    throw new Error(`The board with id ${board.id} hasn't been found`);
  }
  const updatedBoard = await boardsRepo.update(board);
  return updatedBoard;
};

export const boardsService = { getAll, getOne, deleteById, save, update };
