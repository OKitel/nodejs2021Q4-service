import { Connection } from 'typeorm';
import { BoardColumn } from '../database/entities/column.entity';

export const columnsProviders = [
  {
    provide: 'COLUMN_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(BoardColumn),
    inject: ['DATABASE_CONNECTION'],
  },
];
