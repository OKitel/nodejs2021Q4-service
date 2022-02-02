import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export interface IUser {
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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  login: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  salt: string;

  /**
   * Constructor for the `User` object
   * @param user - constructor parameter of type `Partial<IUser>`
   * @returns a new {@link User} instance
   */
  constructor({
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  }: Partial<IUser> = {}) {
    this.name = name;
    this.login = login;
    this.password = password;
  }
}
