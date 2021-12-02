let boards = [
  { id: '1', title: 'Board one', columns: [] },
  { id: '2', title: 'Board two', columns: [] },
  { id: '3', title: 'Board three', columns: [] },
];

const getAll = async () => boards;

const getOne = async (id) => boards.find((item) => item.id === id);

const deleteById = async (id) => {
  boards = boards.filter((board) => board.id !== id);
};

const save = async (board) => {
  boards = [...boards, board];
  return board;
};

const update = async (updatedBoard) => {
  boards = boards.map((board) =>
    board.id === updatedBoard.id ? updatedBoard : board
  );
  return updatedBoard;
};

module.exports = { getAll, getOne, deleteById, save, update };
