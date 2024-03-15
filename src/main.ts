import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformationInterceptor } from './intercepters/response.interceptor';
import { ErrorInterceptor } from './intercepters/error.interceptor';

async function bootstrap() {
  const port = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformationInterceptor(), new ErrorInterceptor());
  await app.listen(port);
  console.log(`Nest.js Main application started on port ${port} and connected to MongoDB.`);

}
bootstrap();
