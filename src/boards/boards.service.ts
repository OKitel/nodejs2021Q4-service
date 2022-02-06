import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ColumnsService } from 'src/columns/columns.service';
import { BoardColumn } from 'src/database/entities/column.entity';
import { TasksService } from 'src/tasks/tasks.service';
import { Repository } from 'typeorm';
import { Board } from '../database/entities/board.entity';
import { BoardDto } from './dto/board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @Inject('BOARD_REPOSITORY')
    private boardRepository: Repository<Board>,
    private columnsService: ColumnsService,
    private tasksService: TasksService,
  ) {}

  async findAll(): Promise<BoardDto[]> {
    const boards = await this.boardRepository.find();
    const boardsWithSortedColumns = boards.map((item) => {
      item.columns = item.columns.sort((a, b) => a.order - b.order);
      return item;
    });
    return boardsWithSortedColumns;
  }

  async findOne(boardId: string): Promise<BoardDto> {
    const board = await this.boardRepository.findOne(boardId);
    if (!board) {
      throw new NotFoundException();
    }
    board.columns.sort((a, b) => a.order - b.order);
    return board;
  }

  async create({ title, columns }: BoardDto): Promise<BoardDto> {
    const board = new Board();
    board.title = title;
    const createdColumns = columns.map(({ order, title: columnTitle }) => {
      const col = new BoardColumn();
      col.board = board;
      col.title = columnTitle;
      col.order = order;
      return col;
    });
    await this.boardRepository.save(board);
    await this.columnsService.saveAll(createdColumns);
    const columnsToResponse = createdColumns.map((item) => {
      return { id: item.id, title: item.title, order: item.order };
    });
    return {
      id: board.id,
      title: board.title,
      columns: columnsToResponse,
    };
  }

  async update(boardId: string, updatedBoard: BoardDto): Promise<BoardDto> {
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
    await this.columnsService.deleteAllByColumnId(idsForDeletion);
    updatedBoard = { ...updatedBoard, id: boardId };
    return await this.boardRepository.save(updatedBoard);
  }

  async delete(boardId: string) {
    await this.tasksService.deleteByBoardId(boardId);
    await this.columnsService.deleteByBoardId(boardId);
    return await this.boardRepository.delete(boardId);
  }
}
