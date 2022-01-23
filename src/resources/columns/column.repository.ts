import { getConnection, getRepository } from 'typeorm';
import { BoardColumn } from './column.model';

/**
 * Returns the column by ID
 * @param id - column ID
 * @returns column by ID
 */
const getOne = async (id: string): Promise<BoardColumn | undefined> => {
  const column = await getRepository(BoardColumn)
    .createQueryBuilder('column')
    .where('column.id = :id', { id })
    .getOne();
  return column;
};

/**
 * Delete all columns from board by ID
 * @param id - board ID
 * @returns this function doesn't return any value
 */
const deleteByBoardId = async (id: string): Promise<void> => {
  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(BoardColumn)
    .where('board.id = :id', { id })
    .execute();
};

/**
 * Save all columns to db
 * @param columns - an array of columns
 * @returns all columns
 */
const saveAll = async (columns: BoardColumn[]): Promise<BoardColumn[]> => {
  await getRepository(BoardColumn).save(columns);
  return columns;
};

export const columnsRepo = {
  getOne,
  deleteByBoardId,
  saveAll,
};
