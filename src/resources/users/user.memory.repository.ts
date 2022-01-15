import { getConnection, getRepository } from 'typeorm';
import { User } from './user.model';

// let users: Array<User> = [
//   {
//     id: 'a1a8478e-7172-4d55-bd3d-a4f594a02151',
//     name: 'User one',
//     login: 'UO',
//     password: '1234',
//   },
//   {
//     id: 'a1a8478e-7172-4d55-bd3d-a4f594a02152',
//     name: 'User two',
//     login: 'UT',
//     password: '1122',
//   },
//   {
//     id: 'a1a8478e-7172-4d55-bd3d-a4f594a02153',
//     name: 'User three',
//     login: 'U3',
//     password: '3333',
//   },
//   {
//     id: 'a1a8478e-7172-4d55-bd3d-a4f594a02157',
//     name: 'User four',
//     login: 'U4',
//     password: '4444',
//   },
//   {
//     id: 'a1a8478e-7172-4d55-bd3d-a4f594a02155',
//     name: 'User five',
//     login: 'U5',
//     password: '5555',
//   },
// ];

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
  await getRepository(User)
    .createQueryBuilder()
    .delete()
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
