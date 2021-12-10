import { Task } from './task.model';

let tasks: Array<Task> = [
  {
    id: 'a9fb7928-0907-48ac-a388-06d4cc4eaeca',
    title: 'Task one',
    order: 1,
    description: 'To do something #1',
    userId: 'a1a8478e-7172-4d55-bd3d-a4f594a02155',
    boardId: 'cd3a4828-1334-4dce-920f-6bd89af1539a',
    columnId: 1,
  },
  {
    id: 'a9fb7928-0907-48ac-a388-06d4cc4eaecb',
    title: 'Task two',
    order: 2,
    description: 'To do something #2',
    userId: 'a1a8478e-7172-4d55-bd3d-a4f594a02155',
    boardId: 'cd3a4828-1334-4dce-920f-6bd89af1539a',
    columnId: 2,
  },
  {
    id: 'a9fb7928-0907-48ac-a388-06d4cc4eafca',
    title: 'Task three',
    order: 3,
    description: 'To do something #3',
    userId: 'a1a8478e-7172-4d55-bd3d-a4f594a02157',
    boardId: 'cd3a4828-1334-4dce-920f-6bd89af1539a',
    columnId: 3,
  },
  {
    id: 'a9fc7928-0907-48ac-a388-06d4cc4eaeca',
    title: 'Task three',
    order: 3,
    description: 'To do something #3',
    userId: 'a1a8478e-7172-4d55-bd3d-a4f594a02157',
    boardId: 'cd3a4828-1334-4dce-920f-6bd89af1539b',
    columnId: 1,
  },
];

/**
 * Returns all tasks by board ID from tasks repository
 * @param id board ID
 * @returns an array of all tasks from the board
 */
const getAllByBoardId = async (id: string) =>
  tasks.filter((task) => task.boardId === id);

/**
 * Returns all tasks by user ID from tasks repository
 * @param id user ID
 * @returns an array of tasks by User ID
 */
const gettAllTasksByUserId = async (id: string) =>
  tasks.filter((task) => task.userId === id);

/**
 * Returns single task by ID from repository
 * @param boardId board ID
 * @param taskId task ID
 * @returns sigle task by ID
 */
const getOne = async (boardId: string, taskId: string) => {
  const tasksOnBoard = tasks.filter((task) => task.boardId === boardId);

  return tasksOnBoard.find((task) => task.id === taskId);
};

/**
 * Delete task by ID from repository
 * @param id task ID
 */
const deleteById = async (id: string) => {
  tasks = tasks.filter((task) => task.id !== id);
};

/**
 * Delete all tasks from board by ID
 * @param id board ID
 */
const deleteTasksByBoardId = async (id: string) => {
  tasks = tasks.filter((task) => task.boardId !== id);
};

/**
 * Save new task to tasks repository
 * @param task see type {@link Task}
 * @returns saved task
 */
const save = async (task: Task) => {
  tasks = [...tasks, task];
  return task;
};

/**
 * Update task in the tasks repository
 * @param updatedTask seet type {@link Task}
 * @returns updated task
 */
const update = async (updatedTask: Task) => {
  tasks = tasks.map((task) =>
    task.id === updatedTask.id ? updatedTask : task
  );
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
