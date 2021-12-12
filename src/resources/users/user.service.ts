import { usersRepo } from './user.memory.repository';
import { tasksRepo } from '../tasks/task.memory.repository';
import { User } from './user.model';

/**
 * Returns all users
 * @returns all users
 */
const getAll = async () => {
  const users = await usersRepo.getAll();
  return users;
};

/**
 * Returns single user by ID
 * @param id - user ID
 * @throws an error if user with passed ID hasn't been found
 * @returns user
 */
const getOne = async (id: string) => {
  const user = await usersRepo.getOne(id);
  if (!user) {
    throw new Error(`The user with id ${id} hasn't been found`);
  }
  return user;
};

/**
 * Delete user by ID
 * @param id - user ID
 */
const deleteById = async (id: string) => {
  const userTasks = await tasksRepo.gettAllTasksByUserId(id);
  for (let i = 0; i < userTasks.length; i += 1) {
    const task = userTasks[i];
    if (!task) {
      throw new Error(`The user task hasn't been found`);
    }
    task.userId = null;
    tasksRepo.update(task);
  }
  await usersRepo.deleteById(id);
};

/**
 * Save new user
 * @param user - see type {@link User}
 */
const save = async (user: User) => {
  await usersRepo.save(user);
};

/**
 * Update user
 * @param user - see type {@link User}
 * @returns updated user
 */
const update = async (user: User) => {
  const oldUser = await usersRepo.getOne(user.id);
  if (!oldUser) {
    throw new Error(`The board with id ${user.id} hasn't been found`);
  }
  const updatedUser = await usersRepo.update(user);
  return updatedUser;
};

/**
 * User Service with standart CRUD operations
 */
export const usersService = { getAll, getOne, deleteById, save, update };
