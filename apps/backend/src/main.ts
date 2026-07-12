import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Allow the Next.js frontend (browser) to call the API during development.
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Validate & sanitize all incoming payloads against their DTOs.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip properties not in the DTO
      forbidNonWhitelisted: true, // 400 on unknown properties
      transform: true, // instantiate DTO classes & coerce types
    }),
  );

  const port = Number(process.env.PORT) || 3001;

  // Bind to 0.0.0.0 so the server is reachable from outside the container.
  await app.listen(port, '0.0.0.0');

  Logger.log(`🦄 UnicornTail API running on http://localhost:${port}`, 'Bootstrap');
}

bootstrap();
