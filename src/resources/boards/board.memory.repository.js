let boards = [
  {
    id: 'cd3a4828-1334-4dce-920f-6bd89af1539a',
    title: 'Board #1',
    columns: [1, 2, 3],
  },
  {
    id: 'cd3a4828-1334-4dce-920f-6bd89af1539b',
    title: 'Board #2',
    columns: [1, 2, 3],
  },
  {
    id: 'cd3a4828-1334-4dce-920f-6bd89af1539c',
    title: 'Board #3',
    columns: [1, 2],
  },
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
