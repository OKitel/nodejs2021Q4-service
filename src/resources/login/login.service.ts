import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../../common/config';
import { hashPasswordWithSalt } from '../../auth/crypto';
import { AccessForbiddenError } from '../../errors';
import { User } from '../users/user.model';
import { usersRepo } from '../users/user.repository';

/**
 * Gets user from repository by user's login
 * @param login - user's login
 * @returns user {@link User}
 */
const getUserByLogin = async (login: string) => {
  const user = await usersRepo.getUserByLogin(login);
  if (user === undefined) {
    throw new AccessForbiddenError(login);
  }
  return user;
};

/**
 * Compares user password from db and request
 * @param user - {@link User}
 * @param password - user password from request
 * @returns nothing
 */
const compareUserPassword = async (user: User, password: string) => {
  const hashedPassword = await hashPasswordWithSalt(password, user.salt);
  if (user.password !== hashedPassword[1]) {
    throw new AccessForbiddenError(user.login);
  }
};

/**
 * Create jsonwebtoken
 * @param user - {@link User}
 * @returns jwt
 */
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
