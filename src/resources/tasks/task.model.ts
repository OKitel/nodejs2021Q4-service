import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Board } from '../boards/board.model';
import { BoardColumn } from '../columns/column.model';
import { User } from '../users/user.model';

interface ITask {
  id: string;

  title: string;

  order: number;

  description: string;

  user: User | null;

  board: Board;

  column: BoardColumn | null;
}

/**
 * Class to create a task object
 */
@Entity()
export class Task implements ITask {
  @PrimaryColumn({ type: 'varchar', length: 40 })
  id: string;

  @Column({ type: 'varchar', length: 1024 })
  title: string;

  @Column()
  order: number;

  @Column({ type: 'varchar', length: 1024 })
  description: string;

  @ManyToOne(() => User)
  user: User | null;

  @ManyToOne(() => Board, { nullable: false })
  board: Board;

  @ManyToOne(() => BoardColumn)
  column: BoardColumn | null;

  /**
   * Constructor for the `Task` object
   * @param task - constructor parameter of type `Partial<ITask>`
   * @returns a new {@link Task} instance
   */
  constructor({
    id = uuidv4(),
    title = 'Task one',
    order = 1,
    description = 'To do something #1',
    user = null,
    board = new Board({}),
    column = null,
  }: Partial<ITask> = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.user = user;
    this.board = board;
    this.column = column;
  }
}
