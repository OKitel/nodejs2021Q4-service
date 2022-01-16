import { getConnection, getRepository } from 'typeorm';
import { User } from './user.model';

/**
 * Returns all users from repository
 * @returns an array of all users
 */
const getAll = async (): Promise<User[]> => {
  const users = await getRepository(User).createQueryBuilder('user').getMany();
  return users;
};

/**
 * Returns single user by ID from users repository
 * @param id - user ID
 * @returns user by ID or undefined if user wasn't been found
 */
const getOne = async (id: string): Promise<User | undefined> => {
  const user = await getRepository(User)
    .createQueryBuilder('user')
    .where('user.id = :id', { id })
    .getOne();
  return user;
};

/**
 * Delete user by ID from repository
 * @param id - user ID
 * @returns this function doesn't return any value
 */
const deleteById = async (id: string): Promise<void> => {
  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(User)
    .where('id = :id', { id })
    .execute();
};

/**
 * Save user to users repository
 * @param user - see type {@link User}
 * @returns saved user
 */
const save = async (user: User): Promise<User> => {
  await getRepository(User)
    .createQueryBuilder()
    .insert()
    .values(user)
    .execute();
  return user;
};

/**
 * Update user in users repository
 * @param updatedUser - see type {@link User}
 * @returns updated user
 */
const update = async (updatedUser: User): Promise<User> => {
  await getConnection()
    .createQueryBuilder()
    .update(User)
    .set(updatedUser)
    .where('id = :id', { id: updatedUser.id })
    .execute();
  return updatedUser;
};

export const usersRepo = { getAll, getOne, deleteById, save, update };
