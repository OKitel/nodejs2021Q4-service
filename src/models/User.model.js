const User = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    login: { type: 'string' },
    password: { type: 'string' },
  },
};

module.exports = User;
