/**
 * Class to represent an error when board hasn't been found
 */
export class BoardNotFoundError extends Error {
  /**
   * Constructor for the `BoardNotFoundError` error
   * @param id - board id
   * @returns a new {@link BoardNotFoundError} instance
   */
  constructor(id: string) {
    super(`The board with id ${id} hasn't been found!`);
  }
}
