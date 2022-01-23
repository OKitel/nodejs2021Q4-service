import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import { loginService } from './login.service';
import { ILogin } from './login.model';

type LoginRequest = FastifyRequest<{
  Body: ILogin;
}>;

export const loginUser = async (req: LoginRequest, reply: FastifyReply) => {
  const { login, password } = req.body;
  const user = await loginService.getUserByLogin(login);
  await loginService.compareUserPassword(user, password);
  const token = await loginService.createJWT(user);
  reply
    .code(StatusCodes.OK)
    .header('Content-Type', 'application/json')
    .send({ token });
};
