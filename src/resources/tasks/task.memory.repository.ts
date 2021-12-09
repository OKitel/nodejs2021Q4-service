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

const getAllByBoardId = async (id: string) =>
  tasks.filter((task) => task.boardId === id);

const gettAllTasksByUserId = async (id: string) =>
  tasks.filter((task) => task.userId === id);

const getOne = async (boardId: string, taskId: string) => {
  const tasksOnBoard = tasks.filter((task) => task.boardId === boardId);

  return tasksOnBoard.find((task) => task.id === taskId);
};

const deleteById = async (id: string) => {
  tasks = tasks.filter((task) => task.id !== id);
};

const deleteTasksByBoardId = async (id: string) => {
  tasks = tasks.filter((task) => task.boardId !== id);
};

const save = async (task: Task) => {
  tasks = [...tasks, task];
  return task;
};

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
