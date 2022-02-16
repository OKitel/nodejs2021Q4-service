import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TasksModule } from 'src/tasks/tasks.module';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './users.providers';
import { UsersService } from './users.service';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => TasksModule),
    forwardRef(() => AuthModule),
  ],
  providers: [...usersProviders, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
