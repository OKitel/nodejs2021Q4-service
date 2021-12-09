import { Board } from './board.model';

let boards: Array<Board> = [
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

const getOne = async (id: string) => boards.find((item) => item.id === id);

const deleteById = async (id: string) => {
  boards = boards.filter((board) => board.id !== id);
};

const save = async (board: Board) => {
  boards = [...boards, board];
  return board;
};

const update = async (updatedBoard: Board) => {
  boards = boards.map((board) =>
    board.id === updatedBoard.id ? updatedBoard : board
  );
  return updatedBoard;
};

export const boardsRepo = { getAll, getOne, deleteById, save, update };
