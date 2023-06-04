import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';

async function bootstrap() {
  config();

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000',
    ],
    methods: ["GET", "POST", 'PUT', 'DELETE'],
    credentials: true,
  });

  await app.listen(process.env.PORT);
}
bootstrap();
