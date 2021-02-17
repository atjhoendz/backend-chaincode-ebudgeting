import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { Logger, ValidationPipe } from '@nestjs/common';
import { EnvConfig } from './config/env';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // json body parser
  app.use(bodyParser.json());

  // Global request validation
  app.useGlobalPipes(new ValidationPipe());

  // Enable CORS
  app.enableCors();

  // Prefix
  app.setGlobalPrefix('api');

  /**
   * Setup Swagger UI
   */
  const options = new DocumentBuilder()
    .setTitle('E-Budgeting Chaincode API')
    .setDescription('RESTful Chaincode E-Budgeting')
    .setVersion('1.0')
    .setExternalDoc(
      'Github Repo',
      'https://github.com/atjhoendz/backend-chaincode-ebudgeting',
    )
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('docs', app, document);

  await app.listen(+EnvConfig.PORT, () => {
    Logger.log(`Started Chain-service on PORT ${EnvConfig.PORT}`, 'INFO', true);
  });
}
bootstrap();
