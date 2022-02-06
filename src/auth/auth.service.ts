import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/users/dto/user.dto';
import { CryptoService } from './crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private crypto: CryptoService,
  ) {}

  async validateUser(login: string, pass: string): Promise<UserDto | null> {
    const user = await this.usersService.getUserWithPassword(login);
    const hashedPassword = await this.crypto.hashPasswordWithSalt(
      pass,
      user.salt,
    );
    if (user && user.password === hashedPassword[1]) {
      const { password, salt, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserDto) {
    const payload = { login: user.login, userId: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
