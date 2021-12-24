export class UserTaskNotFoundError extends Error {
  constructor() {
    super(`The user task hasn't been found`);
  }
}
