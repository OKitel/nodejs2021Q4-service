const tasksRepo = require('./task.memory.repository');

const getAllTasksByBoardId = async (id) => {
  const tasks = await tasksRepo.getAllByBoardId(id);
  return tasks;
};

const getOne = async (boardId, taskId) => {
  const task = await tasksRepo.getOne(boardId, taskId);
  if (!task) {
    throw new Error(`The task with id ${taskId} hasn't been found`);
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

module.exports = { getAllTasksByBoardId, getOne, deleteById, save, update };
