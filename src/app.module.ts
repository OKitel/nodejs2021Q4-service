import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { FileController } from './file/file.controller';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BoardsModule,
    ColumnsModule,
    UsersModule,
    TasksModule,
    AuthModule,
    FileModule,
  ],
  controllers: [
    BoardsController,
    UsersController,
    TasksController,
    AppController,
    FileController,
  ],
  providers: [Logger, { provide: APP_FILTER, useClass: HttpExceptionFilter }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AppLoggerMiddleware)
      .forRoutes('boards', 'users', 'file', 'login');
  }
}
