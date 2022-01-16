import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
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
  @PrimaryColumn({ type: 'varchar', length: 40 })
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
    id = uuidv4(),
    title = `column #${id}`,
    order = 0,
    board = new Board({}),
  }: Partial<IBoardColumn> = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.board = board;
  }
}
