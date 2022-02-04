import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ColumnsService } from 'src/columns/columns.service';
import { BoardColumn } from 'src/database/entities/column.entity';
import { Repository } from 'typeorm';
import { Board } from '../database/entities/board.entity';
import { BoardDto } from './dto/board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @Inject('BOARD_REPOSITORY')
    private boardRepository: Repository<Board>,
    private columnService: ColumnsService,
  ) {}

  async findAll(): Promise<BoardDto[]> {
    const boards = await this.boardRepository.find();
    const boardsWithSortedColumns = boards.map((item) => {
      item.columns = item.columns.sort();
      return item;
    });
    return boardsWithSortedColumns;
  }

  async findOne(boardId: string): Promise<BoardDto> {
    const board = await this.boardRepository.findOne(boardId);
    if (!board) {
      throw new NotFoundException();
    }
    board.columns.sort();
    return board;
  }

  async create(board: BoardDto) {
    return await this.boardRepository.save(board);
  }

  async update(boardId: string, updatedBoard: BoardDto) {
    const oldBoard = await this.boardRepository.findOne(boardId);
    if (!oldBoard) {
      throw new NotFoundException();
    }
    const columns: BoardColumn[] = updatedBoard.columns.map((item) => {
      const column = new BoardColumn();
      column.title = item.title;
      column.order = item.order;
      column.board = oldBoard;
      return column;
    });
    const idsInDatabase = oldBoard.columns.map((item) => item.id);
    const idsInRequest = columns.map((item) => item.id);
    const idsForDeletion = idsInDatabase.filter(
      (id) => !idsInRequest.includes(id),
    );
    await this.columnService.deleteAllByColumnId(idsForDeletion);
    updatedBoard = { ...updatedBoard, id: boardId };
    return await this.boardRepository.save(updatedBoard);
  }

  async delete(boardId: string) {
    await this.columnService.deleteByBoardId(boardId);
    return await this.boardRepository.delete(boardId);
  }
}