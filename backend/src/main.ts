import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import {
  ValidationPipe,
  VERSION_NEUTRAL,
  VersioningType,
} from '@nestjs/common';
import CONSTANTS from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: `http://localhost:${CONSTANTS.frontendPort}`,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  try {
    await app.listen(CONSTANTS.apiPort);
    console.info(`App listening on port ${CONSTANTS.apiPort}`);
  } catch (error) {
    console.error(error.message);
  }
}
bootstrap();
