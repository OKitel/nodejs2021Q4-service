import {
  Controller,
  UseGuards,
  Post,
  Get,
  UseInterceptors,
  UploadedFile,
  StreamableFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file', { dest: 'uploads/' }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    this.fileService.create({
      generatedName: file.filename,
      originalName: file.originalname,
    });
    console.log('File was successfully uploaded', file);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':filename')
  getFile(): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    return new StreamableFile(file);
  }
}
