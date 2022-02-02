/**
 * Class to represent an error when user hasn't been found by login
 */
export class AccessForbiddenError extends Error {
  /**
   * Constructor for the `AccessForbiddenError` error
   * @param login - user login
   * @returns a new {@link AccessForbiddenError} instance
   */
  constructor(login: string) {
    super(`The user with login ${login} hasn't been found`);
  }
}
