import { Module } from '@nestjs/common';
import { ColumnsModule } from 'src/columns/columns.module';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './users.providers';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule, ColumnsModule],
  providers: [...usersProviders, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
