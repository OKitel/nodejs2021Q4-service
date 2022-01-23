import { boardsRepo } from './board.repository';
import { tasksRepo } from '../tasks/task.repository';
import { Board } from './board.model';
import { BoardNotFoundError } from '../../errors';
import { BoardColumn } from '../columns/column.model';
import { BoardLight } from './boardLight.interface';
import { columnsRepo } from '../columns/column.repository';

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
    throw new BoardNotFoundError(id);
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
  await columnsRepo.deleteByBoardId(id);
  await boardsRepo.deleteById(id);
};

/**
 * Save board
 * @param board - see type {@link Board}
 * @returns this function doesn't return any value
 */
const save = async ({ title, columns }: BoardLight): Promise<Board> => {
  const board = new Board({ title });
  const createdColumns = columns.map(
    ({ order, title: columnTitle }) =>
      new BoardColumn({ order, title: columnTitle, board })
  );
  await boardsRepo.save(board);
  await columnsRepo.saveAll(createdColumns);

  return { ...board, columns: createdColumns };
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
    throw new BoardNotFoundError(board.id);
  }
  const columns: BoardColumn[] = board.columns.map(
    (item) => new BoardColumn({ ...item, board })
  );

  const idsInDatabase = oldBoard.columns.map((item) => item.id);
  const idsInRequest = columns.map((item) => item.id);
  const idsForDeletion = idsInDatabase.filter(
    (id) => !idsInRequest.includes(id)
  );
  await columnsRepo.deleteAllByColumnId(idsForDeletion);

  const updatedBoard = await boardsRepo.update({ ...board, columns });

  return updatedBoard;
};

export const boardsService = { getAll, getOne, deleteById, save, update };
