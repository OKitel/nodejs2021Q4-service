const boardsRepo = require('./board.memory.repository');

const getAll = async () => {
  const boards = await boardsRepo.getAll();
  return boards;
};

const getOne = async (id) => {
  const board = await boardsRepo.getOne(id);
  if (!board) {
    throw new Error(`The board with id ${id} hasn't been found`);
  }
  return board;
};

const deleteById = async (id) => {
  await boardsRepo.deleteById(id);
};

const save = async (board) => {
  await boardsRepo.save(board);
};

const update = async (board) => {
  const oldBoard = await boardsRepo.getOne(board.id);
  if (!oldBoard) {
    throw new Error(`The board with id ${board.id} hasn't been found`);
  }
  const updatedBoard = await boardsRepo.update(board);
  return updatedBoard;
};

module.exports = { getAll, getOne, deleteById, save, update };
