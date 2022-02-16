import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { utilities, WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';
import * as winston from 'winston';
import { join } from 'path';
import { ValidationPipe } from './pipes/validation.pipe';
import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import fmp from 'fastify-multipart';

const { LOG_LEVEL: LOG } = process.env;
let LOG_LEVEL_TYPED;
if (
  LOG === 'info' ||
  LOG === 'error' ||
  LOG === 'warning' ||
  LOG === 'debug' ||
  LOG === 'emerg'
) {
  LOG_LEVEL_TYPED = LOG;
} else {
  LOG_LEVEL_TYPED = 'info';
}
const LOG_LEVEL = LOG_LEVEL_TYPED;

const { USE_FASTIFY } = process.env;

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
  let app: INestApplication;
  if (USE_FASTIFY !== 'true') {
    app = await NestFactory.create(AppModule, {
      logger: WinstonModule.createLogger(winstonConfig),
    });
    outLogger.info('EXPRESS');
  } else {
    const fastifyApp = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );
    fastifyApp.register(fmp);
    fastifyApp.enableCors();
    app = fastifyApp;
    outLogger.info('FASTIFY');
  }

  app.useGlobalPipes(new ValidationPipe());

  const config = app.get<ConfigService>(ConfigService);
  const port = config.get('PORT');
  outLogger.info(`App running on port ${port}`);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Trello Service')
    .setDescription("Let's try to create a competitor for Trello!")
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('doc', app, document);
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
