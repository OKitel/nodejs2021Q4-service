import { Module } from '@nestjs/common';
import { BoardsController } from './boards/boards.controller';
import { BoardsModule } from './boards/boards.module';
import { UsersController } from './users/users.controller';
import { TasksController } from './tasks/tasks.controller';
import { ColumnsModule } from './columns/columns.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [BoardsModule, ColumnsModule, UsersModule, TasksModule],
  controllers: [BoardsController, UsersController, TasksController],
  providers: [],
})
export class AppModule {}
