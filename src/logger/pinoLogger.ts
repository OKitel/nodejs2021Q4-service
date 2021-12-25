import pino from 'pino';

export const pinoLogger = pino({
  transport: {
    targets: [
      {
        level: 'trace',
        target: 'pino/file',
        options: {
          destination: './logs/allLogs.log',
          mkdir: true,
        },
      },
      {
        level: 'info',
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
});
