import { Inject, Injectable } from '@nestjs/common';
import { BoardColumn } from 'src/database/entities/column.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ColumnsService {
  constructor(
    @Inject('COLUMN_REPOSITORY')
    private columnRepository: Repository<BoardColumn>,
  ) {}

  async deleteAllByColumnId(ids: string[]) {
    if (ids.length === 0) {
      return;
    }
    return await this.columnRepository.delete(ids);
  }
  async deleteByBoardId(id: string) {
    return await this.columnRepository
      .createQueryBuilder()
      .delete()
      .from(BoardColumn)
      .where('board.id = :id', { id })
      .execute();
  }
}
