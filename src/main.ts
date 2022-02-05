import { NestFactory } from '@nestjs/core';
import { utilities, WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import * as winston from 'winston';
import { join } from 'path';
import { ValidationPipe } from './pipes/validation.pipe';

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
    }),

    new winston.transports.File({
      dirname: join(__dirname, './../logs'),
      filename: 'all.log',
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
  await app.listen(4000);
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
