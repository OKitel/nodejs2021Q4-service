const usersRepo = require('./user.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const getAll = async () => {
  const users = await usersRepo.getAll();
  return users;
};

const getOne = async (id) => {
  const user = await usersRepo.getOne(id);
  if (!user) {
    throw new Error(`The user with id ${id} hasn't been found`);
  }
  return user;
};

const deleteById = async (id) => {
  const userTasks = await tasksRepo.gettAllTasksByUserId(id);
  for (let i = 0; i < userTasks.length; i += 1) {
    userTasks[i].userId = null;
    tasksRepo.update(userTasks[i]);
  }
  await usersRepo.deleteById(id);
};

const save = async (user) => {
  await usersRepo.save(user);
};

const update = async (user) => {
  const oldUser = await usersRepo.getOne(user.id);
  if (!oldUser) {
    throw new Error(`The board with id ${user.id} hasn't been found`);
  }
  const updatedUser = await usersRepo.update(user);
  return updatedUser;
};

module.exports = { getAll, getOne, deleteById, save, update };
