import dotenv from 'dotenv';
import path from 'path';
import pino from 'pino';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export const { PORT = 4000, NODE_ENV } = process.env;

const { JWT_SECRET_KEY: JWT_TEMP_SECRET_KEY } = process.env;
if (!JWT_TEMP_SECRET_KEY) {
  throw new Error('Please, set up JWT secret key!');
}
export const JWT_SECRET_KEY = JWT_TEMP_SECRET_KEY;

const { AUTH_MODE: TEMP } = process.env;
export const AUTH_MODE = TEMP === 'true';

const { LOG_LEVEL: LOG } = process.env;
let LOG_LEVEL_TYPED: pino.LevelWithSilent;
if (
  LOG === 'info' ||
  LOG === 'error' ||
  LOG === 'warn' ||
  LOG === 'debug' ||
  LOG === 'trace' ||
  LOG === 'fatal'
) {
  LOG_LEVEL_TYPED = LOG;
} else {
  LOG_LEVEL_TYPED = 'info';
}

export const LOG_LEVEL = LOG_LEVEL_TYPED;
