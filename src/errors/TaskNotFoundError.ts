/**
 * Class to represent an error when task hasn't been found
 */
export class TaskNotFoundError extends Error {
  /**
   * Constructor for the `TaskNotFoundError` error
   * @param id - task id
   * @returns a new {@link TaskNotFoundError} instance
   */
  constructor(id: string) {
    super(`The task with id ${id} hasn't been found`);
  }
}
