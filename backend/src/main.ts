import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import {
  ValidationPipe,
  VERSION_NEUTRAL,
  VersioningType,
} from '@nestjs/common';
import { VersionMiddleware } from './middlewares/version.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({
    origin: `http://localhost:${process.env.FRONTEND_PORT}`,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL,
    prefix: 'v',
  });
  app.use(new VersionMiddleware().use);

  const PORT = process.env.API_PORT;
  try {
    await app.listen(PORT);
    console.info(`App listening on port ${PORT}`);
  } catch (error) {
    console.error(error.message);
  }
}
bootstrap();
