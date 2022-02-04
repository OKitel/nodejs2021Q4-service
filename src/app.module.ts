import { Module } from '@nestjs/common';
import { BoardsController } from './boards/boards.controller';
import { BoardsModule } from './boards/boards.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { ColumnsModule } from './columns/columns.module';

@Module({
  imports: [BoardsModule, ColumnsModule],
  controllers: [BoardsController, UsersController, TasksController],
  providers: [UsersService, TasksService],
})
export class AppModule {}
