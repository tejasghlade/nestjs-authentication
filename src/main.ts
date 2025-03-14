import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip away extra properties
      forbidNonWhitelisted: true, // Throw error on extra properties
      transform: true, // Transform payloads to DTO instances
    }),
  );
  await app.listen(3000);
}
bootstrap();
