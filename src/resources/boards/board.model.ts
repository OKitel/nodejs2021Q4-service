import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
// eslint-disable-next-line import/no-cycle
import { BoardColumn } from '../columns/column.model';

interface IBoard {
  id: string;

  title: string;

  columns: Array<BoardColumn>;
}

/**
 * Class to create a board object
 */
@Entity()
export class Board implements IBoard {
  @PrimaryColumn({ type: 'varchar', length: 40 })
  id: string;

  @Column({ type: 'varchar', length: 1024 })
  title: string;

  @OneToMany(() => BoardColumn, (column) => column.board)
  columns: Array<BoardColumn>;

  /**
   * Constructor for the `Board` object
   * @param board - constructor parameter of type `Partial<IBoard>`
   * @returns a new {@link Board} instance
   */
  constructor({ title, columns }: Partial<IBoard> = {}) {
    if (title) {
      this.id = uuidv4();
      this.title = title;
      this.columns = columns || [];
    }
  }
}
