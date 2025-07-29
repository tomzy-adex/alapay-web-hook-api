// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from './config';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use('/api/v1/user/validate-customer', bodyParser.text({ type: '*/xml' }));
  app.use('/api/v1/user/process-payment', bodyParser.text({ type: '*/xml' }));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('ALAPAY')
    .setDescription('Web Hook API')
    .setVersion('v1')
    .addBearerAuth(
      {
        description: `Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'JWT',
    )
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      config.frontendUrl,
      config.individualUrl,
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    credentials: true,
  });

  await app.startAllMicroservices();
  await app.listen(config.port);
}

bootstrap().then(() => {
  Logger.log(`
      ------------
      Server Application Started!
      API V1: ${config.baseUrl}/
      API Docs: ${config.baseUrl}/docs
      Microserservice Started Successfully
      ------------
`);
});
