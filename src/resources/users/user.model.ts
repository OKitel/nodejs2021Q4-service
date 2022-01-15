import { Entity, Column, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

interface IUser {
  id: string;

  name: string;

  login: string;

  password: string;
}

/**
 * Class to create a user object
 */
@Entity()
export class User implements IUser {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  login: string;

  @Column()
  password: string;

  /**
   * Constructor for the `User` object
   * @param user - constructor parameter of type `Partial<IUser>`
   * @returns a new {@link User} instance
   */
  constructor({
    id = uuidv4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  }: Partial<IUser>) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }
}
