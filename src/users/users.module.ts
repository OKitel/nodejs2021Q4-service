import { forwardRef, Module } from '@nestjs/common';
import { TasksModule } from 'src/tasks/tasks.module';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './users.providers';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule, forwardRef(() => TasksModule)],
  providers: [...usersProviders, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
