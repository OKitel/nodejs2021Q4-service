import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardDto } from './dto/board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  async findAll(): Promise<BoardDto[]> {
    return await this.boardsService.findAll();
  }

  @Get(':boardId')
  async findOne(
    @Param('boardId', new ParseUUIDPipe()) boardId: string,
  ): Promise<BoardDto> {
    return await this.boardsService.findOne(boardId);
  }

  @Post()
  async create(@Body() board: BoardDto): Promise<BoardDto> {
    return await this.boardsService.create(board);
  }

  @Put(':boardId')
  async update(
    @Param('boardId', new ParseUUIDPipe()) boardId: string,
    @Body() board: BoardDto,
  ) {
    return await this.boardsService.update(boardId, board);
  }

  @Delete(':boardId')
  @HttpCode(204)
  async remove(@Param('boardId', new ParseUUIDPipe()) boardId: string) {
    return await this.boardsService.delete(boardId);
  }
}
