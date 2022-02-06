import { NestFactory } from '@nestjs/core';
import { utilities, WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import * as winston from 'winston';
import { join } from 'path';
import { ValidationPipe } from './pipes/validation.pipe';
import { ConfigService } from '@nestjs/config';

const { LOG_LEVEL: LOG } = process.env;
let LOG_LEVEL_TYPED;
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
const LOG_LEVEL = LOG_LEVEL_TYPED;

const winstonConfig = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        utilities.format.nestLike('RsselloApp', {
          prettyPrint: true,
        }),
      ),
      level: LOG_LEVEL,
    }),

    new winston.transports.File({
      dirname: join(__dirname, './../logs'),
      filename: 'all.log',
      level: LOG_LEVEL,
    }),
    new winston.transports.File({
      dirname: join(__dirname, './../logs'),
      filename: 'error.log',
      level: 'error',
    }),
  ],
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = app.get<ConfigService>(ConfigService);
  const port = config.get('PORT');
  outLogger.info(`App running on port ${port}`);
  await app.listen(port);
}

const outLogger = winston.createLogger(winstonConfig);

process.on('uncaughtException', (err, origin) => {
  outLogger.error(`Caught exception: ${err}. Exception origin: ${origin}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  outLogger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  process.exit(1);
});

bootstrap();
