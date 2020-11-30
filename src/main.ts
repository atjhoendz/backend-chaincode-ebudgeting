import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { Logger, ValidationPipe } from '@nestjs/common';
import { EnvConfig } from './common/config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // json body parser
  app.use(bodyParser.json());

  // Global request validation
  app.useGlobalPipes(new ValidationPipe());

  // Enable CORS
  app.enableCors();

  await app.listen(+EnvConfig.PORT, () => {
    Logger.log(`Started Chain-service on PORT ${EnvConfig.PORT}`, 'INFO', true);
  });
}
bootstrap();
