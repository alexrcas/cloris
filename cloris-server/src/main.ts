import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['verbose', 'log', 'error', 'warn', 'debug']
  });
  app.enableCors();
  await app.listen(port);
}
bootstrap();
