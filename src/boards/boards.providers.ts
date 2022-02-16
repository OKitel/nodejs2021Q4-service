import { Connection } from 'typeorm';
import { Board } from '../database/entities/board.entity';

export const boardsProviders = [
  {
    provide: 'BOARD_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Board),
    inject: ['DATABASE_CONNECTION'],
  },
];
