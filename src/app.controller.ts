import { Controller, Request, Post, UseGuards, HttpCode } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginRequestDto } from './auth/dto/login-request.dto';
import { LoginResponseDto } from './auth/dto/login-response.dto';

@ApiTags('login')
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Authenticate user',
    description: 'Returns user jwt',
  })
  @ApiBody({ type: LoginRequestDto })
  @ApiResponse({
    status: 200,
    description: 'jwt',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
