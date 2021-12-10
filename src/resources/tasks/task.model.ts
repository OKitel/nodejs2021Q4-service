import { v4 as uuidv4 } from 'uuid';

interface ITask {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string;

  columnId: null | number;
}

/**
 * Class to create a task object
 */
export class Task implements ITask {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string;

  columnId: null | number;

  constructor({
    id = uuidv4(),
    title = 'Task one',
    order = 1,
    description = 'To do something #1',
    userId = '1',
    boardId = '1',
    columnId = null,
  }: Partial<ITask>) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}
