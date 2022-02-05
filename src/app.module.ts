import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BoardsController } from './boards/boards.controller';
import { BoardsModule } from './boards/boards.module';
import { UsersController } from './users/users.controller';
import { TasksController } from './tasks/tasks.controller';
import { ColumnsModule } from './columns/columns.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { AppLoggerMiddleware } from './middlewares/app.logger.middleware';

@Module({
  imports: [BoardsModule, ColumnsModule, UsersModule, TasksModule],
  controllers: [BoardsController, UsersController, TasksController],
  providers: [Logger, { provide: APP_FILTER, useClass: HttpExceptionFilter }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('boards', 'users', 'file');
  }
}
