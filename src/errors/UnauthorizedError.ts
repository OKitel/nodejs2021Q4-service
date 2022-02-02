/**
 * Class to represent an error when user is unauthorized
 */
export class UnauthorizedError extends Error {
  /**
   * Constructor for the `UnauthorizedError` error
   * @returns a new {@link UnauthorizedError} instance
   */
  constructor() {
    super('The user is unauthorized');
  }
}
