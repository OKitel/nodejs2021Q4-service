const tasksRepo = require('./task.memory.repository');

const getAll = async () => {
  const tasks = await tasksRepo.getAll();
  return tasks;
};

const getOne = async (id) => {
  const task = await tasksRepo.getOne(id);
  if (!task) {
    throw new Error(`The task with id ${id} hasn't been found`);
  }
  return task;
};

const deleteById = async (id) => {
  await tasksRepo.deleteById(id);
};

const save = async (task) => {
  await tasksRepo.save(task);
};

const update = async (task) => {
  const oldTask = await tasksRepo.getOne(task.id);
  if (!oldTask) {
    throw new Error(`The board with id ${task.id} hasn't been found`);
  }
  const updatedTask = await tasksRepo.update(task);
  return updatedTask;
};

module.exports = { getAll, getOne, deleteById, save, update };
