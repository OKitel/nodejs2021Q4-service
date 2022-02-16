import { BoardColumn } from 'src/columns/interfaces/column.interface';

export interface Board {
  id: string;

  title: string;

  columns: Array<BoardColumn>;
}
