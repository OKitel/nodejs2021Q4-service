import { tasksRepo } from './task.memory.repository';
import { boardsRepo } from '../boards/board.memory.repository';
import { Task } from './task.model';

const getAllTasksByBoardId = async (id: string) => {
  const board = await boardsRepo.getOne(id);
  if (!board) {
    throw new Error(`Board with id ${id} has't found!`);
  }
  const tasks = await tasksRepo.getAllByBoardId(id);
  return tasks;
};

const getOne = async (boardId: string, taskId: string) => {
  const task = await tasksRepo.getOne(boardId, taskId);
  if (!task) {
    throw new Error(`The task with id ${taskId} hasn't been found`);
  }
  return task;
};

const deleteById = async (id: string) => {
  await tasksRepo.deleteById(id);
};

const save = async (task: Task) => {
  await tasksRepo.save(task);
};

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
