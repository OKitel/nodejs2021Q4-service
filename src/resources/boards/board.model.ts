import { Entity, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

interface IBoard {
  id: string;

  title: string;

  columns: Array<number>;
}

/**
 * Class to create a board object
 */
@Entity()
export class Board implements IBoard {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  columns: Array<number>;

  /**
   * Constructor for the `Board` object
   * @param board - constructor parameter of type `Partial<IBoard>`
   * @returns a new {@link Board} instance
   */
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
