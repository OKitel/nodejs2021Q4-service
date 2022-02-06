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
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BoardsService } from './boards.service';
import { BoardDto } from './dto/board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<BoardDto[]> {
    return await this.boardsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':boardId')
  async findOne(
    @Param('boardId', new ParseUUIDPipe()) boardId: string,
  ): Promise<BoardDto> {
    return await this.boardsService.findOne(boardId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() board: BoardDto): Promise<BoardDto> {
    return await this.boardsService.create(board);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':boardId')
  async update(
    @Param('boardId', new ParseUUIDPipe()) boardId: string,
    @Body() board: BoardDto,
  ) {
    return await this.boardsService.update(boardId, board);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':boardId')
  @HttpCode(204)
  async remove(@Param('boardId', new ParseUUIDPipe()) boardId: string) {
    await this.boardsService.delete(boardId);
  }
}
