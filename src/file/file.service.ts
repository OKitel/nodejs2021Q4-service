import { Inject, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { File } from '../database/entities/file.entity';

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
}
