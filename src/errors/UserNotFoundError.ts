export class UserNotFoundError extends Error {
  constructor(id: string) {
    super(`The user with id ${id} hasn't been found`);
  }
}
