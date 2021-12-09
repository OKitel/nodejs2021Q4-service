import { boardsRepo } from './board.memory.repository';
import { tasksRepo } from '../tasks/task.memory.repository';
import { Board } from './board.model';

const getAll = async () => {
  const boards = await boardsRepo.getAll();
  return boards;
};

const getOne = async (id: string) => {
  const board = await boardsRepo.getOne(id);
  if (!board) {
    throw new Error(`The board with id ${id} hasn't been found`);
  }
  return board;
};

const deleteById = async (id: string) => {
  await tasksRepo.deleteTasksByBoardId(id);
  await boardsRepo.deleteById(id);
};

const save = async (board: Board) => {
  await boardsRepo.save(board);
};

const update = async (board: Board) => {
  const oldBoard = await boardsRepo.getOne(board.id);
  if (!oldBoard) {
    throw new Error(`The board with id ${board.id} hasn't been found`);
  }
  const updatedBoard = await boardsRepo.update(board);
  return updatedBoard;
};

export const boardsService = { getAll, getOne, deleteById, save, update };
