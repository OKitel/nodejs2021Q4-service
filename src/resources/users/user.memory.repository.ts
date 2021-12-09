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

const getAll = async () => users;

const getOne = async (id: string) => users.find((item) => item.id === id);

const deleteById = async (id: string) => {
  users = users.filter((user) => user.id !== id);
};

const save = async (user: User) => {
  users = [...users, user];
  return user;
};

const update = async (updatedUser: User) => {
  users = users.map((user) =>
    user.id === updatedUser.id ? updatedUser : user
  );
  return updatedUser;
};

export const usersRepo = { getAll, getOne, deleteById, save, update };
