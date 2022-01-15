import { getRepository } from 'typeorm';
import { BoardColumn } from './column.model';

const getOne = async (id: string): Promise<BoardColumn | undefined> => {
  const column = await getRepository(BoardColumn)
    .createQueryBuilder('column')
    .where('column.id = :id', { id })
    .getOne();
  return column;
};

export const columnsRepo = {
  getOne,
};
