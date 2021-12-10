import { v4 as uuidv4 } from 'uuid';

interface IBoard {
  id: string;

  title: string;

  columns: Array<number>;
}

/**
 * Class to create a board object
 */
export class Board implements IBoard {
  id: string;

  title: string;

  columns: Array<number>;

  constructor({
    id = uuidv4(),
    title = 'Board title',
    columns = [],
  }: Partial<IBoard>) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}
