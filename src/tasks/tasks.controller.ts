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

@Controller('boards/:boardId/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Param('boardId', new ParseUUIDPipe()) boardId: string,
  ): Promise<TaskDto[]> {
    return await this.tasksService.findAll(boardId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':taskId')
  async findOne(
    @Param('boardId', new ParseUUIDPipe()) boardId: string,
    @Param('taskId', new ParseUUIDPipe()) taskId: string,
  ): Promise<TaskDto> {
    return await this.tasksService.findOne(boardId, taskId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Param('boardId', new ParseUUIDPipe()) boardId: string,
    @Body() task: CreateTaskDto,
  ): Promise<TaskDto> {
    return await this.tasksService.create(boardId, task);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':taskId')
  async update(
    @Param('boardId', new ParseUUIDPipe()) boardId: string,
    @Param('taskId', new ParseUUIDPipe()) taskId: string,
    @Body() task: CreateTaskDto,
  ): Promise<TaskDto> {
    return await this.tasksService.update(taskId, boardId, task);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':taskId')
  @HttpCode(204)
  async remove(
    @Param('boardId', new ParseUUIDPipe()) boardId: string,
    @Param('taskId', new ParseUUIDPipe()) taskId: string,
  ) {
    return await this.tasksService.delete(taskId);
  }
}
