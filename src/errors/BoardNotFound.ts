export class BoardNotFound extends Error {
  constructor(id: string) {
    super(`The board with id ${id} hasn't been found!`);
  }
}
