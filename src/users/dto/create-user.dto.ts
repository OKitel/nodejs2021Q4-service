import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  login: string;

  @ApiProperty()
  @IsString()
  password: string;
}
