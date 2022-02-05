import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Board } from './board.entity';
import { BoardColumn } from './column.entity';
import { User } from './user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
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
}
