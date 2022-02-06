import {
  Controller,
  UseGuards,
  Post,
  Get,
  UseInterceptors,
  UploadedFile,
  StreamableFile,
  Param,
  Logger,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService, private logger: Logger) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file', { dest: 'uploads/' }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    this.fileService.create({
      generatedName: file.filename,
      originalName: file.originalname,
    });
    this.logger.log('File was successfully uploaded!');
    return { message: 'File was successfully uploaded!' };
  }

  @Get(':filename')
  async getFile(@Param('filename') filename: string): Promise<StreamableFile> {
    const fileFromDb = await this.fileService.findOne(filename);
    const file = createReadStream(
      join(process.cwd(), 'uploads', fileFromDb.generatedName),
    );
    return new StreamableFile(file);
  }
}
