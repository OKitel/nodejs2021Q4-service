import { Logger, Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { fileProviders } from './file.providers';
import { FileService } from './file.service';

@Module({
  imports: [DatabaseModule, Logger],
  providers: [...fileProviders, FileService, Logger],
  exports: [FileService],
})
export class FileModule {}
