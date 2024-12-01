import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.API_PORT;
  try {
    await app.listen(PORT);
    console.info(`App listening on port ${PORT}`);
  } catch (error) {
    console.error(error.message);
  }
}
bootstrap();
