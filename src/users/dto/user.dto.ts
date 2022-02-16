import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class UserDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  login: string;
}
