import { getConnection, getRepository } from 'typeorm';
import { Task } from './task.model';

/**
 * Returns all tasks by board ID from tasks repository
 * @param id - board ID
 * @returns an array of all tasks from the board
 */
const getAllByBoardId = async (id: string): Promise<Task[]> => {
  const tasks = await getRepository(Task)
    .createQueryBuilder('task')
    .where('task.boardId = :id', { id })
    .getMany();
  return tasks;
};

/**
 * Returns single task by ID from repository
 * @param boardId - board ID
 * @param taskId - task ID
 * @returns sigle task by ID or undefined if there wasn't found task by passed ID
 */
const getOne = async (
  boardId: string,
  taskId: string
): Promise<Task | undefined> => {
  const task = await getRepository(Task)
    .createQueryBuilder('task')
    .where('task.id = :taskId', { taskId })
    .andWhere('task.board.id = :boardId', { boardId })
    .getOne();
  return task;
};

/**
 * Delete task by ID from repository
 * @param id - task ID
 * @returns this function doesn't return any value
 */
const deleteById = async (id: string): Promise<void> => {
  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Task)
    .where('id = :id', { id })
    .execute();
};

/**
 * Delete all tasks from board by ID
 * @param id - board ID
 * @returns this function doesn't return any value
 */
const deleteTasksByBoardId = async (id: string): Promise<void> => {
  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Task)
    .where('board.id = :id', { id })
    .execute();
};

/**
 * Save new task to tasks repository
 * @param task - see type {@link Task}
 * @returns saved task
 */
const save = async (task: Task): Promise<Task> => {
  await getRepository(Task)
    .createQueryBuilder()
    .insert()
    .values(task)
    .execute();
  return task;
};

/**
 * Update task in the tasks repository
 * @param updatedTask - see type {@link Task}
 * @returns updated task
 */
const update = async (updatedTask: Task): Promise<Task> => {
  await getConnection()
    .createQueryBuilder()
    .update(Task)
    .set(updatedTask)
    .where('id = :id', { id: updatedTask.id })
    .execute();
  return updatedTask;
};

const unassignUserFromAllTasks = async (userId: string): Promise<void> => {
  await getConnection()
    .createQueryBuilder()
    .update(Task)
    .set({ user: null })
    .where('userId = :id', { id: userId })
    .execute();
};

export const tasksRepo = {
  getAllByBoardId,
  getOne,
  deleteById,
  save,
  update,
  deleteTasksByBoardId,
  unassignUserFromAllTasks,
};
