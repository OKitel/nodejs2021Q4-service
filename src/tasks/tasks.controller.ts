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
import { TasksService } from './tasks.service';
import { TaskDto } from './dto/task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiResponse,
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('boards/:boardId/tasks')
@ApiBearerAuth()
@ApiResponse({
  status: 401,
  description: 'Unauthorized',
})
@UseGuards(JwtAuthGuard)
@Controller('boards/:boardId/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @ApiOperation({
    summary: 'Get all tasks from the board',
    description: 'Returns all tasks from the board by boardId',
  })
  @ApiParam({
    name: 'boardId',
    description: 'uuid',
    example: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: TaskDto,
    isArray: true,
  })
  @Get()
  async findAll(
    @Param('boardId', new ParseUUIDPipe()) boardId: string,
  ): Promise<TaskDto[]> {
    return await this.tasksService.findAll(boardId);
  }

  @ApiOperation({
    summary: 'Get task by id',
    description: 'Gets the Task by taskId and boardId',
  })
  @ApiParam({
    name: 'boardId',
    description: 'uuid',
    example: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
  })
  @ApiParam({
    name: 'taskId',
    description: 'uuid',
    example: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: TaskDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  @Get(':taskId')
  async findOne(
    @Param('boardId', new ParseUUIDPipe()) boardId: string,
    @Param('taskId', new ParseUUIDPipe()) taskId: string,
  ): Promise<TaskDto> {
    return await this.tasksService.findOne(boardId, taskId);
  }

  @ApiOperation({ summary: 'Create task', description: 'Creates a new task' })
  @ApiParam({
    name: 'boardId',
    description: 'uuid',
    example: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
  })
  @ApiResponse({
    status: 201,
    description: 'The task has been created',
    type: TaskDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @Post()
  async create(
    @Param('boardId', new ParseUUIDPipe()) boardId: string,
    @Body() task: CreateTaskDto,
  ): Promise<TaskDto> {
    return await this.tasksService.create(boardId, task);
  }

  @ApiOperation({
    summary: 'Update task',
    description: 'Updates a Task by taskId and boardId',
  })
  @ApiParam({
    name: 'boardId',
    description: 'uuid',
    example: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
  })
  @ApiParam({
    name: 'taskId',
    description: 'uuid',
    example: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: TaskDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  @Put(':taskId')
  async update(
    @Param('boardId', new ParseUUIDPipe()) boardId: string,
    @Param('taskId', new ParseUUIDPipe()) taskId: string,
    @Body() task: CreateTaskDto,
  ): Promise<TaskDto> {
    return await this.tasksService.update(taskId, boardId, task);
  }

  @ApiOperation({
    summary: 'Delete task',
    description: 'Deletes a Task by taskId and boardId',
  })
  @ApiParam({
    name: 'boardId',
    description: 'uuid',
    example: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
  })
  @ApiParam({
    name: 'taskId',
    description: 'uuid',
    example: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
  })
  @ApiResponse({
    status: 204,
    description: 'The task has been deleted',
  })
  @Delete(':taskId')
  @HttpCode(204)
  async remove(
    @Param('boardId', new ParseUUIDPipe()) boardId: string,
    @Param('taskId', new ParseUUIDPipe()) taskId: string,
  ) {
    await this.tasksService.delete(taskId);
  }
}
