import {
  Injectable,
  Inject,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { BoardsService } from 'src/boards/boards.service';
import { ColumnsService } from 'src/columns/columns.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Task } from '../database/entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private taskRepository: Repository<Task>,
    @Inject(forwardRef(() => BoardsService))
    private boardsService: BoardsService,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private columnsService: ColumnsService,
  ) {}

  async findAll(boardId: string): Promise<TaskDto[]> {
    const board = await this.boardsService.findOne(boardId);
    if (!board) {
      throw new NotFoundException();
    }
    const tasks = await this.taskRepository
      .createQueryBuilder('task')
      .where('task.boardId = :id', { id: board.id })
      .getMany();
    const tasksToResponse = tasks.map((item) => {
      return {
        id: item.id,
        title: item.title,
        order: item.order,
        description: item.description,
        userId: item.user?.id ?? null,
        boardId: board.id,
        columnId: item.column?.id ?? null,
      };
    });
    return tasksToResponse;
  }

  async findOne(boardId: string, taskId: string): Promise<TaskDto> {
    const board = await this.boardsService.findOne(boardId);
    if (!board) {
      throw new NotFoundException();
    }

    const task = await this.taskRepository
      .createQueryBuilder('task')
      .where('task.id = :taskId', { taskId })
      .andWhere('task.board.id = :boardId', { boardId })
      .getOne();

    if (!task) {
      throw new NotFoundException();
    }

    return {
      id: task.id,
      title: task.title,
      order: task.order,
      description: task.description,
      userId: task.user?.id ?? null,
      boardId,
      columnId: task.column?.id ?? null,
    };
  }

  async create(task: CreateTaskDto): Promise<TaskDto> {
    const user = task.userId
      ? await this.usersService.findOne(task.userId)
      : null;
    const board = await this.boardsService.findOne(task.boardId);
    if (!board) {
      throw new NotFoundException();
    }
    const column = task.columnId
      ? await this.columnsService.findOne(task.columnId)
      : null;
    const newTask = await this.taskRepository.save({
      title: task.title,
      order: task.order,
      description: task.description,
      user,
      board,
      column,
    });
    const { id, title, order, description } = newTask;
    return {
      id,
      title,
      order,
      description,
      userId: user?.id ?? null,
      boardId: board.id,
      columnId: column?.id ?? null,
    };
  }

  async update(id: string, updatedTask: CreateTaskDto): Promise<TaskDto> {
    const oldTask = await this.taskRepository.findOne(id);
    if (!oldTask) {
      throw new NotFoundException();
    }
    const user = updatedTask.userId
      ? await this.usersService.findOne(updatedTask.userId)
      : null;
    const board = await this.boardsService.findOne(updatedTask.boardId);
    if (!board) {
      throw new NotFoundException();
    }
    const column = updatedTask.columnId
      ? await this.columnsService.findOne(updatedTask.columnId)
      : null;
    const newTask = {
      id,
      title: updatedTask.title,
      order: updatedTask.order,
      description: updatedTask.description,
      user,
      board,
      column,
    };
    const updatedT = await this.taskRepository.save(newTask);
    const { title, order, description } = updatedT;
    return {
      id,
      title,
      order,
      description,
      userId: user?.id ?? null,
      boardId: board.id,
      columnId: column?.id ?? null,
    };
  }

  async delete(id: string) {
    await this.taskRepository.delete(id);
  }

  async deleteByBoardId(id: string) {
    await this.taskRepository
      .createQueryBuilder()
      .delete()
      .from(Task)
      .where('board.id = :id', { id })
      .execute();
  }

  async unassignUserFromAllTasks(userId: string): Promise<void> {
    await this.taskRepository
      .createQueryBuilder()
      .update(Task)
      .set({ user: null })
      .where('userId = :id', { id: userId })
      .execute();
  }
}
