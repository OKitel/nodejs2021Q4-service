const uuid = require('uuid');

class Task {
  constructor({
    id = uuid.v4(),
    title = 'Task one',
    order = 1,
    description = 'To do something #1',
    userId = '1',
    boardId = '1',
    columnId = null,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

module.exports = Task;
