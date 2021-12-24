export class UserTaskNotFound extends Error {
  constructor() {
    super(`The user task hasn't been found`);
  }
}
