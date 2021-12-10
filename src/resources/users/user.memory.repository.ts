import { User } from './user.model';

let users: Array<User> = [
  {
    id: 'a1a8478e-7172-4d55-bd3d-a4f594a02151',
    name: 'User one',
    login: 'UO',
    password: '1234',
  },
  {
    id: 'a1a8478e-7172-4d55-bd3d-a4f594a02152',
    name: 'User two',
    login: 'UT',
    password: '1122',
  },
  {
    id: 'a1a8478e-7172-4d55-bd3d-a4f594a02153',
    name: 'User three',
    login: 'U3',
    password: '3333',
  },
  {
    id: 'a1a8478e-7172-4d55-bd3d-a4f594a02157',
    name: 'User four',
    login: 'U4',
    password: '4444',
  },
  {
    id: 'a1a8478e-7172-4d55-bd3d-a4f594a02155',
    name: 'User five',
    login: 'U5',
    password: '5555',
  },
];

/**
 * Returns all users from repository
 * @returns all users
 */
const getAll = async () => users;

/**
 * Returns single user by ID from users repository
 * @param id user ID
 * @returns user by ID
 */
const getOne = async (id: string) => users.find((item) => item.id === id);

/**
 * Delete user by ID from repository
 * @param id user ID
 */
const deleteById = async (id: string) => {
  users = users.filter((user) => user.id !== id);
};

/**
 * Save user to users repository
 * @param user see type {@link User}
 * @returns saved user
 */
const save = async (user: User) => {
  users = [...users, user];
  return user;
};

/**
 * Update user in users repository
 * @param updatedUser see type {@link User}
 * @returns updated user
 */
const update = async (updatedUser: User) => {
  users = users.map((user) =>
    user.id === updatedUser.id ? updatedUser : user
  );
  return updatedUser;
};

export const usersRepo = { getAll, getOne, deleteById, save, update };
