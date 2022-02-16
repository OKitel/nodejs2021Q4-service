import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class File {
  @PrimaryColumn({ type: 'varchar', length: 1024 })
  generatedName: string;

  @Column({ type: 'varchar', length: 1024 })
  originalName: string;
}
