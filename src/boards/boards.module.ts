import { forwardRef, Module } from '@nestjs/common';
import { ColumnsModule } from 'src/columns/columns.module';
import { TasksModule } from 'src/tasks/tasks.module';
import { DatabaseModule } from '../database/database.module';
import { boardsProviders } from './boards.providers';
import { BoardsService } from './boards.service';

@Module({
  imports: [DatabaseModule, ColumnsModule, forwardRef(() => TasksModule)],
  providers: [...boardsProviders, BoardsService],
  exports: [BoardsService],
})
export class BoardsModule {}
