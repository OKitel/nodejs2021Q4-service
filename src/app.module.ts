import { Module } from '@nestjs/common';
import { BoardsController } from './boards/boards.controller';
import { BoardsModule } from './boards/boards.module';
import { UsersController } from './users/users.controller';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { ColumnsModule } from './columns/columns.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [BoardsModule, ColumnsModule, UsersModule],
  controllers: [BoardsController, UsersController, TasksController],
  providers: [TasksService],
})
export class AppModule {}
