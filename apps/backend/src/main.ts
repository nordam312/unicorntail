import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Allow the Next.js frontend (browser) to call the API during development.
  app.enableCors({
    origin: true,
    credentials: true,
  });

  const port = Number(process.env.PORT) || 3001;

  // Bind to 0.0.0.0 so the server is reachable from outside the container.
  await app.listen(port, '0.0.0.0');

  Logger.log(`🦄 UnicornTail API running on http://localhost:${port}`, 'Bootstrap');
}

bootstrap();
