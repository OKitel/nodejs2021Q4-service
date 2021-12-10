import { tasksRepo } from './task.memory.repository';
import { boardsRepo } from '../boards/board.memory.repository';
import { Task } from './task.model';

/**
 * Returns all tasks by board ID
 * @param id board ID
 * @throws an error if a board with a passed ID hasn't been found
 * @returns an array of tasks
 */
const getAllTasksByBoardId = async (id: string) => {
  const board = await boardsRepo.getOne(id);
  if (!board) {
    throw new Error(`Board with id ${id} has't found!`);
  }
  const tasks = await tasksRepo.getAllByBoardId(id);
  return tasks;
};

/**
 * Returns single task by board ID and task ID
 * @param boardId board ID
 * @param taskId task ID
 * @throws an error if a task with a passed ID hasn't been found
 * @returns task
 */
const getOne = async (boardId: string, taskId: string) => {
  const task = await tasksRepo.getOne(boardId, taskId);
  if (!task) {
    throw new Error(`The task with id ${taskId} hasn't been found`);
  }
  return task;
};

/**
 * Delete task by ID
 * @param id task ID
 */
const deleteById = async (id: string) => {
  await tasksRepo.deleteById(id);
};

/**
 * Save task
 * @param task see type {@link Task}
 */
const save = async (task: Task) => {
  await tasksRepo.save(task);
};

/**
 * Update task
 * @param task see type {@link Task}
 * @throws an error if a task with a passed ID hasn't been found
 * @returns updated task
 */
const update = async (task: Task) => {
  const oldTask = await tasksRepo.getOne(task.boardId, task.id);
  if (!oldTask) {
    throw new Error(`The task with id ${task.id} hasn't been found`);
  }
  const updatedTask = await tasksRepo.update(task);
  return updatedTask;
};

export const tasksService = {
  getAllTasksByBoardId,
  getOne,
  deleteById,
  save,
  update,
};
