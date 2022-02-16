import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { File } from '../database/entities/file.entity';
import * as fs from 'fs';
import { pipeline } from 'stream';
import { FastifyRequest, FastifyReply } from 'fastify';
import * as util from 'util';
import { AppResponseDto } from './dto/app-response.dto';

@Injectable()
export class FileService {
  constructor(
    @Inject('FILE_REPOSITORY')
    private fileRepository: Repository<File>,
    private logger: Logger,
  ) {}

  async findOne(filename: string): Promise<File> {
    return await this.fileRepository
      .createQueryBuilder('file')
      .where('file.originalName = :filename', { filename })
      .getOne();
  }

  async create(file: File): Promise<void> {
    await this.fileRepository.save(file);
  }

  async uploadFile(req: FastifyRequest, res: FastifyReply): Promise<void> {
    if (!req.isMultipart()) {
      res.send(
        new BadRequestException(
          new AppResponseDto(400, undefined, 'Request is not multipart'),
        ),
      );
      return;
    }
    await req.multipart(this.handler, onEnd);

    async function onEnd(err: Error) {
      if (err) {
        res.send(new HttpException('Internal server error', 500));
        return;
      }
      res
        .code(200)
        .send(new AppResponseDto(200, undefined, 'Data uploaded successfully'));
    }
  }

  async handler(_: string, file: any, filename: string): Promise<void> {
    const customPipeline = util.promisify(pipeline);
    const writeStream = fs.createWriteStream(`uploads/${filename}`); //File path
    try {
      await customPipeline(file, writeStream);
    } catch (err) {
      console.error('Pipeline failed', err);
    }
  }
}
