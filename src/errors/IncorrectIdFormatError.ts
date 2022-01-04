/**
 * Class to represent an error when incorrect id format was provided
 */
export class IncorrectIdFormatError extends Error {
  /**
   * Constructor for the `IncorrectIdFormatError` error
   * @returns a new {@link IncorrectIdFormatError} instance
   */
  constructor() {
    super('Incorrect ID format!');
  }
}
