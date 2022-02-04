import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<UserDto[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<UserDto> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async create(user: CreateUserDto): Promise<UserDto> {
    const newUser = await this.userRepository.save(user);
    const { id, name, login } = newUser;
    return { id, name, login };
  }

  async update(id: string, updatedUser: CreateUserDto): Promise<UserDto> {
    const oldUser = await this.userRepository.findOne(id);
    if (!oldUser) {
      throw new NotFoundException();
    }
    return await this.userRepository.save(updatedUser);
  }

  async delete(id: string) {
    return await this.userRepository.delete(id);
  }
}
