import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FastifyRequest, FastifyReply } from 'fastify';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('file')
export class FastifyFileController {
  constructor(private fileService: FileService) {}
  @Post()
  async uploadFile(
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply<any>,
  ): Promise<any> {
    console.log('KUSKA FASTIFY');
    return await this.fileService.uploadFile(req, res);
  }

  @Get(':filename')
  async getFile(@Param('filename') filename: string): Promise<StreamableFile> {
    const file = createReadStream(join(process.cwd(), 'uploads', filename));
    return new StreamableFile(file);
  }
}
