let tasks = [
  {
    id: '1',
    title: 'Task one',
    order: 1,
    description: 'To do something #1',
    userId: '1',
    boardId: 'cd3a4828-1334-4dce-920f-6bd89af1539a',
    columnId: '1',
  },
  {
    id: '2',
    title: 'Task two',
    order: 2,
    description: 'To do something #2',
    userId: '2',
    boardId: 'cd3a4828-1334-4dce-920f-6bd89af1539a',
    columnId: '2',
  },
  {
    id: '3',
    title: 'Task three',
    order: 3,
    description: 'To do something #3',
    userId: '3',
    boardId: 'cd3a4828-1334-4dce-920f-6bd89af1539a',
    columnId: '3',
  },
  {
    id: '4',
    title: 'Task three',
    order: 3,
    description: 'To do something #3',
    userId: '3',
    boardId: 'cd3a4828-1334-4dce-920f-6bd89af1539b',
    columnId: '1',
  },
];

const getAllByBoardId = async (id) =>
  tasks.filter((task) => task.boardId === id);

const getOne = async (id) => tasks.find((task) => task.id === id);

const deleteById = async (id) => {
  tasks = tasks.filter((task) => task.id !== id);
};

const save = async (task) => {
  tasks = [...tasks, task];
  return task;
};

const update = async (updatedTask) => {
  tasks = tasks.map((task) =>
    task.id === updatedTask.id ? updatedTask : tasks
  );
  return updatedTask;
};

module.exports = { getAllByBoardId, getOne, deleteById, save, update };
