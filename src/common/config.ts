import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export const {
  PORT = 4000,
  NODE_ENV,
  MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY,
} = process.env;

export const AUTH_MODE = process.env.AUTH_MODE === 'true';
