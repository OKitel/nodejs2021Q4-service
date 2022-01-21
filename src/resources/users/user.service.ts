import { usersRepo } from './user.repository';
import { tasksRepo } from '../tasks/task.repository';
import { IUser, User } from './user.model';
import { UserNotFoundError } from '../../errors';
import { hashPassword } from '../../common/crypto';

/**
 * Returns all users
 * @returns an array of all users
 */
const getAll = async (): Promise<User[]> => {
  const users = await usersRepo.getAll();
  return users;
};

/**
 * Returns single user by ID
 * @param id - user ID
 * @throws an error if user with passed ID hasn't been found
 * @returns user, see type {@link User}
 */
const getOne = async (id: string): Promise<User> => {
  const user = await usersRepo.getOne(id);
  if (!user) {
    throw new UserNotFoundError(id);
  }
  return user;
};

/**
 * Delete user by ID
 * @param id - user ID
 * @throws an error if user with passed ID hasn't been found
 * @returns this function doesn't return any value
 */
const deleteById = async (id: string): Promise<void> => {
  await tasksRepo.unassignUserFromAllTasks(id);
  await usersRepo.deleteById(id);
};

/**
 * Save new user
 * @param user - see type {@link User}
 * @returns this function doesn't return any value
 */
const save = async (user: IUser): Promise<void> => {
  const userSaltAndHash = await hashPassword(user.password);
  await usersRepo.save({
    ...user,
    password: userSaltAndHash[1],
    salt: userSaltAndHash[0],
  });
};

/**
 * Update user
 * @param user - see type {@link User}
 * @throws an error if user with passed ID hasn't been found
 * @returns updated user
 */
const update = async (user: IUser): Promise<IUser> => {
  const oldUser = await usersRepo.getOne(user.id);
  if (!oldUser) {
    throw new UserNotFoundError(user.id);
  }
  const userSaltAndHash = await hashPassword(user.password);
  const updatedUser = await usersRepo.update({
    ...user,
    password: userSaltAndHash[1],
    salt: userSaltAndHash[0],
  });
  return updatedUser;
};

/**
 * User Service with standard CRUD operations
 */
export const usersService = { getAll, getOne, deleteById, save, update };
