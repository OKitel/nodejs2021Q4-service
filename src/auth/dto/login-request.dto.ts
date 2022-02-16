import { ApiProperty } from '@nestjs/swagger';
export class LoginRequestDto {
  @ApiProperty()
  login: string;

  @ApiProperty()
  password: string;
}
