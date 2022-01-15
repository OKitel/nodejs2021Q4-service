import { tasksRepo } from './task.memory.repository';
import { boardsRepo } from '../boards/board.memory.repository';
import { Task } from './task.model';
import { BoardNotFoundError } from '../../errors/BoardNotFoundError';
import { TaskNotFoundError } from '../../errors/TaskNotFoundError';
import { usersRepo } from '../users/user.memory.repository';
import { columnsRepo } from '../columns/column.repository';

interface ITaskWithIds {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string | null;
}

/**
 * Returns all tasks by board ID
 * @param id - board ID
 * @throws an error if a board with a passed ID hasn't been found
 * @returns an array of tasks
 */
const getAllTasksByBoardId = async (id: string): Promise<Task[]> => {
  const board = await boardsRepo.getOne(id);
  if (!board) {
    throw new BoardNotFoundError(id);
  }
  const tasks = await tasksRepo.getAllByBoardId(id);
  return tasks;
};

/**
 * Returns single task by board ID and task ID
 * @param boardId - board ID
 * @param taskId - task ID
 * @throws an error if a task with a passed ID hasn't been found
 * @returns task, see type {@link Task}
 */
const getOne = async (boardId: string, taskId: string): Promise<Task> => {
  const task = await tasksRepo.getOne(boardId, taskId);
  if (!task) {
    throw new TaskNotFoundError(taskId);
  }
  return task;
};

/**
 * Delete task by ID
 * @param id - task ID
 * @returns this function doesn't return any value
 */
const deleteById = async (id: string): Promise<void> => {
  await tasksRepo.deleteById(id);
};

/**
 * Save task
 * @param task - see type {@link Task}
 * @returns this function doesn't return any value
 */
const save = async ({
  title,
  order,
  description,
  userId,
  boardId,
  columnId,
}: Omit<ITaskWithIds, 'id'>): Promise<Task> => {
  const user = userId ? await usersRepo.getOne(userId) : null;
  const board = await boardsRepo.getOne(boardId);
  const column = columnId ? await columnsRepo.getOne(columnId) : null;
  const task = new Task({ title, order, description, user, board, column });
  return tasksRepo.save(task);
};

/**
 * Update task
 * @param task - see type {@link Task}
 * @throws an error if a task with a passed ID hasn't been found
 * @returns updated task
 */
const update = async (task: ITaskWithIds): Promise<Task> => {
  const oldTask = await tasksRepo.getOne(task.boardId, task.id);
  if (!oldTask) {
    throw new TaskNotFoundError(task.id);
  }
  const user = task.userId ? await usersRepo.getOne(task.userId) : null;
  const board = await boardsRepo.getOne(task.boardId);
  const column = task.columnId ? await columnsRepo.getOne(task.columnId) : null;
  const newTask = new Task({
    id: task.id,
    title: task.title,
    order: task.order,
    description: task.description,
    user,
    board,
    column,
  });
  const updatedTask = await tasksRepo.update(newTask);
  return updatedTask;
};

export const tasksService = {
  getAllTasksByBoardId,
  getOne,
  deleteById,
  save,
  update,
};
