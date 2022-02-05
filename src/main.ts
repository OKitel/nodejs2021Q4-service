import { NestFactory } from '@nestjs/core';
import { utilities, WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import * as winston from 'winston';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
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
    }),
  });
  await app.listen(4000);
}
bootstrap();
