/**
 * Class to represent an error when user's task hasn't been found
 */
export class UserTaskNotFoundError extends Error {
  /**
   * Constructor for the `UserTaskNotFoundError` error
   * @returns a new {@link UserTaskNotFoundError} instance
   */
  constructor() {
    super(`The user's task hasn't been found`);
  }
}
