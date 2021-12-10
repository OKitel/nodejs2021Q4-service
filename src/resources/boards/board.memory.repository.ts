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

/**
 * Returns all boards from boards repository
 * @returns all boards
 */
const getAll = async () => boards;

/**
 * Returns the single board by ID from boards repository
 * @param id - board ID
 * @returns board by ID
 */
const getOne = async (id: string) => boards.find((item) => item.id === id);

/**
 * Delete board by ID from boards repository
 * @param id - board ID
 */
const deleteById = async (id: string) => {
  boards = boards.filter((board) => board.id !== id);
};

/**
 * Save board to boards repository
 * @param board - see type {@link Board}
 * @returns just saved board
 */
const save = async (board: Board) => {
  boards = [...boards, board];
  return board;
};

/**
 * Update board by ID into boards repository
 * @param updatedBoard - see type {@link Board}
 * @returns updated board
 */
const update = async (updatedBoard: Board) => {
  boards = boards.map((board) =>
    board.id === updatedBoard.id ? updatedBoard : board
  );
  return updatedBoard;
};

export const boardsRepo = { getAll, getOne, deleteById, save, update };
