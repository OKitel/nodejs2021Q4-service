import pino from 'pino';
import { LOG_LEVEL } from '../common/config';

export const pinoLogger = pino({
  transport: {
    targets: [
      {
        level: LOG_LEVEL,
        target: 'pino/file',
        options: {
          destination: './logs/allLogs.log',
          mkdir: true,
        },
      },
      {
        level: LOG_LEVEL,
        target: 'pino-pretty',
        options: {
          destination: 2,
          translateTime: 'SYS:standard',
        },
      },
      {
        level: 'error',
        target: 'pino/file',
        options: {
          destination: './logs/errorLogs.log',
          mkdir: true,
        },
      },
    ],
  },
  level: LOG_LEVEL,
});
