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
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { createReadStream } from 'fs';
import { join } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileService } from './file.service';

@ApiTags('file')
@Controller('file')
export class FileController {
  constructor(private fileService: FileService, private logger: Logger) {}

  @ApiOperation({
    summary: 'Upload file',
  })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
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

  @ApiOperation({
    summary: 'Get file by name',
  })
  @ApiParam({
    name: 'filename',
    description: 'string',
    example: 'astronaut.jpg',
  })
  @Get(':filename')
  async getFile(@Param('filename') filename: string): Promise<StreamableFile> {
    const fileFromDb = await this.fileService.findOne(filename);
    const file = createReadStream(
      join(process.cwd(), 'uploads', fileFromDb.generatedName),
    );
    return new StreamableFile(file);
  }
}
