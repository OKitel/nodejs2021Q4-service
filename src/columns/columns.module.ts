import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { columnsProviders } from './columns.providers';
import { ColumnsService } from './columns.service';

@Module({
  imports: [DatabaseModule],
  providers: [...columnsProviders, ColumnsService],
  exports: [ColumnsService],
})
export class ColumnsModule {}
