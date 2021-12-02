let tasks = [
  {
    id: '1',
    title: 'Task one',
    order: 1,
    description: 'To do something #1',
    userId: '1',
    boardId: '1',
    columnId: '1',
  },
  {
    id: '2',
    title: 'Task two',
    order: 2,
    description: 'To do something #2',
    userId: '2',
    boardId: '2',
    columnId: '2',
  },
  {
    id: '3',
    title: 'Task three',
    order: 3,
    description: 'To do something #3',
    userId: '3',
    boardId: '3',
    columnId: '3',
  },
];

const getAll = async () => tasks;

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

module.exports = { getAll, getOne, deleteById, save, update };
