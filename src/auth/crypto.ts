import { Injectable } from '@nestjs/common';
import { hash, genSalt } from 'bcrypt';

const saltRounds = 10;

type SaltAndHash = [string, string];

@Injectable()
export class CryptoService {
  async hashPasswordWithSalt(
    password: string,
    salt: string,
  ): Promise<SaltAndHash> {
    return new Promise((resolve, reject) => {
      hash(password, salt, (error: Error | undefined, hash: string): void => {
        if (error) {
          reject(error.message);
        } else {
          resolve([salt, hash]);
        }
      });
    });
  }

  async hashPassword(password: string): Promise<SaltAndHash> {
    return new Promise((res, reject) => {
      genSalt(saltRounds, async (err: Error | undefined, salt: string) => {
        if (err) {
          reject(err.message);
        }
        const passwordWithSalt = await this.hashPasswordWithSalt(
          password,
          salt,
        );
        res(passwordWithSalt);
      });
    });
  }
}
