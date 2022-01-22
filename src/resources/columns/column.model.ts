import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { Board } from '../boards/board.model';

interface IBoardColumn {
  id: string;

  title: string;

  order: number;

  board: Board;
}

/**
 * Class to create a column
 */
@Entity()
export class BoardColumn implements IBoardColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 1024 })
  title: string;

  @Column()
  order: number;

  @ManyToOne(() => Board, (board) => board.columns, { nullable: false })
  board: Board;

  /**
   * Constructor for the `BoardColumn` object
   * @param column - constructor parameter of type `IBoardColumn`
   * @returns a new {@link BoardColumn} instance
   */
  constructor({
    order = 0,
    title = `column #${order}`,
    board = new Board({}),
  }: Partial<IBoardColumn> = {}) {
    this.title = title;
    this.order = order;
    this.board = board;
  }
}
