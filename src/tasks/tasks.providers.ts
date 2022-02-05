import { Connection } from 'typeorm';
import { Task } from '../database/entities/task.entity';

export const tasksProviders = [
  {
    provide: 'TASK_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Task),
    inject: ['DATABASE_CONNECTION'],
  },
];
