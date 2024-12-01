import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
// import { ValidationExceptionFilter } from './app.filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // app.useGlobalFilters(new ValidationExceptionFilter());
  const PORT = process.env.API_PORT;
  try {
    await app.listen(PORT);
    console.info(`App listening on port ${PORT}`);
  } catch (error) {
    console.error(error.message);
  }
}
bootstrap();
