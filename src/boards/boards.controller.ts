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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BoardsService } from './boards.service';
import { BoardDto } from './dto/board.dto';
import { CreateBoardDto } from './dto/create-board.dto';

@ApiTags('boards')
@ApiBearerAuth()
@ApiResponse({
  status: 401,
  description: 'Unauthorized',
})
@UseGuards(JwtAuthGuard)
@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @ApiOperation({
    summary: 'Get all boards',
    description: 'Returns all boards',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: BoardDto,
    isArray: true,
  })
  @Get()
  async findAll(): Promise<BoardDto[]> {
    return await this.boardsService.findAll();
  }

  @ApiOperation({
    summary: 'Get board by id',
    description: 'Gets the Board by ID',
  })
  @ApiParam({
    name: 'boardId',
    description: 'uuid',
    example: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: BoardDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Board not found',
  })
  @Get(':boardId')
  async findOne(
    @Param('boardId', new ParseUUIDPipe())
    boardId: string,
  ): Promise<BoardDto> {
    return await this.boardsService.findOne(boardId);
  }

  @ApiOperation({ summary: 'Create board', description: 'Creates a new board' })
  @ApiResponse({
    status: 201,
    description: 'The board has been created',
    type: BoardDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @Post()
  async create(@Body() board: CreateBoardDto): Promise<BoardDto> {
    return await this.boardsService.create(board);
  }

  @ApiOperation({
    summary: 'Update board',
    description: 'Updates a Board by ID',
  })
  @ApiParam({
    name: 'boardId',
    description: 'uuid',
    example: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: BoardDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 404,
    description: 'Board not found',
  })
  @Put(':boardId')
  async update(
    @Param('boardId', new ParseUUIDPipe()) boardId: string,
    @Body() board: BoardDto,
  ) {
    return await this.boardsService.update(boardId, board);
  }

  @ApiOperation({
    summary: 'Delete board',
    description:
      'Deletes a Board by ID, all tasks and columns  are also deleted from the board',
  })
  @ApiParam({
    name: 'boardId',
    description: 'uuid',
    example: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
  })
  @ApiResponse({
    status: 204,
    description: 'The board has been deleted',
  })
  @Delete(':boardId')
  @HttpCode(204)
  async remove(@Param('boardId', new ParseUUIDPipe()) boardId: string) {
    await this.boardsService.delete(boardId);
  }
}
