let users = [
  { id: '1', name: 'User one', login: 'UO', password: '1234' },
  { id: '2', name: 'User two', login: 'UT', password: '1122' },
  { id: '3', name: 'User three', login: 'U3', password: '3333' },
];

const getAll = async () => users;

const getOne = async (id) => users.find((item) => item.id === id);

const deleteById = async (id) => {
  users = users.filter((user) => user.id !== id);
};

const save = async (user) => {
  users = [...users, user];
  return user;
};

const update = async (updatedUser) => {
  users = users.map((user) =>
    user.id === updatedUser.id ? updatedUser : user
  );
  return updatedUser;
};

module.exports = { getAll, getOne, deleteById, save, update };
