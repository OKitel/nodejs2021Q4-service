/**
 * Class to represent an error when user hasn't been found
 */
export class UserNotFoundError extends Error {
  /**
   * Constructor for the `UserNotFoundError` error
   * @param id - user id
   * @returns a new {@link UserNotFoundError} instance
   */
  constructor(id: string) {
    super(`The user with id ${id} hasn't been found`);
  }
}
