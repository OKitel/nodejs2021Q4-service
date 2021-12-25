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
export class User implements IUser {
  id: string;

  name: string;

  login: string;

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
