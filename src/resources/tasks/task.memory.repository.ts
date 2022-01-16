import { getConnection, getRepository } from 'typeorm';
import { Task } from './task.model';

// let tasks: Array<Task> = [
//   {
//     id: 'a9fb7928-0907-48ac-a388-06d4cc4eaeca',
//     title: 'Task one',
//     order: 1,
//     description: 'To do something #1',
//     userId: 'a1a8478e-7172-4d55-bd3d-a4f594a02155',
//     boardId: 'cd3a4828-1334-4dce-920f-6bd89af1539a',
//     columnId: 1,
//   },
//   {
//     id: 'a9fb7928-0907-48ac-a388-06d4cc4eaecb',
//     title: 'Task two',
//     order: 2,
//     description: 'To do something #2',
//     userId: 'a1a8478e-7172-4d55-bd3d-a4f594a02155',
//     boardId: 'cd3a4828-1334-4dce-920f-6bd89af1539a',
//     columnId: 2,
//   },
//   {
//     id: 'a9fb7928-0907-48ac-a388-06d4cc4eafca',
//     title: 'Task three',
//     order: 3,
//     description: 'To do something #3',
//     userId: 'a1a8478e-7172-4d55-bd3d-a4f594a02157',
//     boardId: 'cd3a4828-1334-4dce-920f-6bd89af1539a',
//     columnId: 3,
//   },
//   {
//     id: 'a9fc7928-0907-48ac-a388-06d4cc4eaeca',
//     title: 'Task three',
//     order: 3,
//     description: 'To do something #3',
//     userId: 'a1a8478e-7172-4d55-bd3d-a4f594a02157',
//     boardId: 'cd3a4828-1334-4dce-920f-6bd89af1539b',
//     columnId: 1,
//   },
// ];

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
 * Returns all tasks by user ID from tasks repository
 * @param id - user ID
 * @returns an array of tasks by User ID
 */
const gettAllTasksByUserId = async (id: string): Promise<Task[]> => {
  const tasks = await getRepository(Task)
    .createQueryBuilder('task')
    .where('task.userId = :id', { id })
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
    .where('task.id = :id', { id: taskId })
    .andWhere('task.boardId = :id', { id: boardId })
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

export const tasksRepo = {
  getAllByBoardId,
  getOne,
  deleteById,
  save,
  update,
  deleteTasksByBoardId,
  gettAllTasksByUserId,
};
