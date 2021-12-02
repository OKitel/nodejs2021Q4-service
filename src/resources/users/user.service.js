const usersRepo = require('./user.memory.repository');

const getAll = async () => {
  const users = await usersRepo.getAll();
  return users;
};

const getOne = async (id) => {
  const user = await usersRepo.getOne(id);
  if (!user) {
    throw new Error(`The user with id ${id} has't been found`);
  }
  return user;
};

const deleteById = async (id) => {
  await usersRepo.deleteById(id);
};

const save = async (user) => {
  await usersRepo.save(user);
};

const update = async (user) => {
  const oldUser = await usersRepo.getOne(user.id);
  if (!oldUser) {
    throw new Error(`The board with id ${user.id} has't been found`);
  }
  const updatedUser = await usersRepo.update(user);
  return updatedUser;
};

module.exports = { getAll, getOne, deleteById, save, update };
