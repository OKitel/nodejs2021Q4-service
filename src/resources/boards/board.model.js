const uuid = require('uuid');

class Board {
  constructor({ id = uuid.v4(), title = 'Board title', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
