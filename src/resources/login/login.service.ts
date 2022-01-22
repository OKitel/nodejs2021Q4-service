import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../../common/config';
import { hashPasswordWithSalt } from '../../auth/crypto';
import { AccessForbiddenError } from '../../errors';
import { User } from '../users/user.model';
import { usersRepo } from '../users/user.repository';

const getUserByLogin = async (login: string) => {
  const user = await usersRepo.getUserByLogin(login);
  if (user === undefined) {
    throw new AccessForbiddenError(login);
  }
  return user;
};

const compareUserPassword = async (user: User, password: string) => {
  const hashedPassword = await hashPasswordWithSalt(password, user.salt);
  if (user.password !== hashedPassword[1]) {
    throw new AccessForbiddenError(user.login);
  }
};

const createJWT = async (user: User): Promise<string> =>
  new Promise((res, rej) => {
    jwt.sign(
      { userId: user.id, login: user.login },
      JWT_SECRET_KEY,
      (err: Error | null, token: string | undefined) => {
        if (err) {
          rej(err);
        }
        if (!token) {
          rej(err);
          return;
        }
        res(token);
      }
    );
  });

export const loginService = {
  getUserByLogin,
  compareUserPassword,
  createJWT,
};
