import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UserDto[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserDto> {
    return await this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() user: CreateUserDto): Promise<UserDto> {
    return await this.usersService.create(user);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() user: CreateUserDto,
  ) {
    return await this.usersService.update(id, user);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('boardId', new ParseUUIDPipe()) id: string) {
    return await this.usersService.delete(id);
  }
}
