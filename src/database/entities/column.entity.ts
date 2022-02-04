import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Board } from './board.entity';

@Entity()
export class BoardColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 1024 })
  title: string;

  @Column()
  order: number;

  @ManyToOne(() => Board, (board) => board.columns, { nullable: false })
  board: Board;
}
