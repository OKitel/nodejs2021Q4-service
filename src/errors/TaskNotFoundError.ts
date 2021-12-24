export class TaskNotFoundError extends Error {
  constructor(id: string) {
    super(`The task with id ${id} hasn't been found`);
  }
}
