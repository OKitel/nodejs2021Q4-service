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
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@ApiResponse({
  status: 401,
  description: 'Unauthorized',
})
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({
    summary: 'Get all users',
    description: 'Returns all users',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: UserDto,
    isArray: true,
  })
  @Get()
  async findAll(): Promise<UserDto[]> {
    return await this.usersService.findAll();
  }

  @ApiOperation({
    summary: 'Get user by id',
    description: 'Gets the User by ID',
  })
  @ApiParam({
    name: 'userId',
    description: 'uuid',
    example: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: UserDto,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserDto> {
    return await this.usersService.findOne(id);
  }

  @ApiOperation({ summary: 'Create user', description: 'Creates a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been created',
    type: UserDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @Post()
  async create(@Body() user: CreateUserDto): Promise<UserDto> {
    return await this.usersService.create(user);
  }

  @ApiOperation({
    summary: 'Update user',
    description: 'Updates a User by ID',
  })
  @ApiParam({
    name: 'userId',
    description: 'uuid',
    example: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: UserDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() user: CreateUserDto,
  ) {
    return await this.usersService.update(id, user);
  }

  @ApiOperation({
    summary: 'Delete user',
    description: "Deletes a User by ID, all user's tasks are unassigned",
  })
  @ApiParam({
    name: 'userId',
    description: 'uuid',
    example: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
  })
  @ApiResponse({
    status: 204,
    description: 'The user has been deleted',
  })
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.usersService.delete(id);
  }
}
