import {
  Injectable,
  Inject,
  NotFoundException,
  forwardRef,
  ForbiddenException,
} from '@nestjs/common';
import { TasksService } from 'src/tasks/tasks.service';
import { Repository } from 'typeorm';
import { User } from '../database/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { CryptoService } from 'src/auth/crypto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject(forwardRef(() => TasksService))
    private tasksService: TasksService,
    @Inject(forwardRef(() => CryptoService))
    private crypto: CryptoService,
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
    const userSaltAndHash = await this.crypto.hashPassword(user.password);
    const newUser = await this.userRepository.save({
      ...user,
      password: userSaltAndHash[1],
      salt: userSaltAndHash[0],
    });
    const { id, name, login } = newUser;
    return { id, name, login };
  }

  async update(id: string, updatedUser: CreateUserDto): Promise<UserDto> {
    const oldUser = await this.userRepository.findOne(id);
    if (!oldUser) {
      throw new NotFoundException();
    }
    const userSaltAndHash = await this.crypto.hashPassword(
      updatedUser.password,
    );
    const persistedUser = await this.userRepository.save({
      ...updatedUser,
      password: userSaltAndHash[1],
      salt: userSaltAndHash[0],
    });
    return persistedUser;
  }

  async delete(id: string) {
    await this.tasksService.unassignUserFromAllTasks(id);
    return await this.userRepository.delete(id);
  }

  async getUserWithPassword(login: string): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.login = :login', { login })
      .getOne();
    if (!user) {
      throw new ForbiddenException();
    }
    return user;
  }
}
