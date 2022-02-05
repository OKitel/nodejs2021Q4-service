import { forwardRef, Module } from '@nestjs/common';
import { BoardsModule } from 'src/boards/boards.module';
import { ColumnsModule } from 'src/columns/columns.module';
import { UsersModule } from 'src/users/users.module';
import { DatabaseModule } from '../database/database.module';
import { tasksProviders } from './tasks.providers';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => BoardsModule),
    forwardRef(() => UsersModule),
    ColumnsModule,
  ],
  providers: [...tasksProviders, TasksService],
  exports: [TasksService],
})
export class TasksModule {}
