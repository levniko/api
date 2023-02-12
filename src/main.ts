import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'aws-sdk';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: '*',
  });
  const configDocs = new DocumentBuilder()
    .setTitle('Education API')
    .setDescription('Education API description')
    .setVersion('1.0')
    .addTag('education')
    .build();
  const document = SwaggerModule.createDocument(app, configDocs);
  SwaggerModule.setup('docs', app, document);

  app.setGlobalPrefix('v1');

  config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
