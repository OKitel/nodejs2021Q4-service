import { Board } from 'src/boards/interfaces/board.interface';
import { BoardColumn } from 'src/columns/interfaces/column.interface';
import { User } from 'src/users/interfaces/user.interface';

export class Task {
  id: string;

  title: string;

  order: number;

  description: string;

  user: User | null;

  board: Board;

  column: BoardColumn | null;
}
