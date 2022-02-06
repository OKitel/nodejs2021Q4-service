import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Repository } from 'typeorm';
import { File } from '../database/entities/file.entity';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class FileService {
  constructor(
    @Inject('FILE_REPOSITORY')
    private fileRepository: Repository<File>,
    @Inject(REQUEST) private readonly request: Request,
    private logger: Logger,
  ) {}

  async findOne(filename: string): Promise<File> {
    return await this.fileRepository.findOne(filename);
  }

  async create(file: File): Promise<void> {
    this.logger.log(this.request.user);
    await this.fileRepository.save(file);
  }
}
