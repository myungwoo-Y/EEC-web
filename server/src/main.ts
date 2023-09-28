import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import configMap from './config/config-map';

async function bootstrap() {
  config();

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  app.use(cookieParser());
  app.use(cors({credentials: true, origin: configMap.domain}));

  await app.listen(process.env.PORT);
}
bootstrap();
