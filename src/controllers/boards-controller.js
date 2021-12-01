const { v4: uuidv4 } = require('uuid');
let boards = require('../db/boards.repository');

const getBoards = (req, reply) => {
  reply.send(boards);
};

const getBoard = (req, reply) => {
  const { id } = req.params;
  const board = boards.find((item) => item.id === id);
  reply.code(200).header('Content-Type', 'application/json').send(board);
};

const addBoard = (req, reply) => {
  const { title, columns } = req.body;
  const board = {
    id: uuidv4(),
    title,
    columns,
  };

  boards = [...boards, board];
  reply.code(201).send(board);
};

const deleteBoard = (req, reply) => {
  const { id } = req.params;
  boards = boards.filter((board) => board.id !== id);
  reply.send({ message: `Board ${id} has been removed` });
};

const updateBoard = (req, reply) => {
  const { id } = req.params;
  const { title, columns } = req.body;
  boards = boards.map((board) =>
    board === id ? { id, title, columns } : board
  );
  const board = boards.find((item) => item.id === id);
  reply.send(board);
};
module.exports = {
  getBoards,
  getBoard,
  addBoard,
  deleteBoard,
  updateBoard,
};
