import * as jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../common/config';
import { UnauthorizedError } from '../errors/UnauthorizedError';

export interface UserJwtPayload extends jwt.JwtPayload {
  userId: string;
  login: string;
}

export const verifyToken = async (
  authHeader: string | undefined
): Promise<UserJwtPayload> => {
  const incomingAuthHeader = authHeader?.split(' ');
  if (
    !incomingAuthHeader ||
    incomingAuthHeader[0] !== 'Bearer' ||
    typeof incomingAuthHeader[1] !== 'string'
  ) {
    throw new UnauthorizedError();
  }
  const incomingToken = incomingAuthHeader[1];
  return new Promise((res, rej) => {
    jwt.verify(incomingToken, JWT_SECRET_KEY, (err, user) => {
      if (err || !user) {
        rej(new UnauthorizedError());
      } else {
        res(<UserJwtPayload>user);
      }
    });
  });
};
