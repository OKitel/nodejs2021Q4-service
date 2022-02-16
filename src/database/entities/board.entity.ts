import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BoardColumn } from './column.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 1024 })
  title: string;

  @OneToMany(() => BoardColumn, (column) => column.board, {
    cascade: true,
    eager: true,
  })
  columns: Array<BoardColumn>;
}
