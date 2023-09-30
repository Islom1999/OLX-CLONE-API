import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()

  app.setGlobalPrefix('api')

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API documentation for your Nest.js application')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
