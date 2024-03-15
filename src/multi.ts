import { NestFactory } from '@nestjs/core';
// const { NestFactory } = require('@nestjs/common');
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformationInterceptor } from './intercepters/response.interceptor';
import { ErrorInterceptor } from './intercepters/error.interceptor';
import * as os from 'os';
// import cluster from 'cluster';
const cluster = require('cluster')

async function bootstrap() {
  const numCPUs = os.cpus().length;
  if (cluster.isMaster) {
    // Fork workers
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  } else {
    const port = process.env.PORT || 4000;
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log'],
    });
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new TransformationInterceptor(), new ErrorInterceptor());
    await app.listen(Number(port)+cluster.worker.id);
    console.log(`Nest.js multi process application started on port ${Number(port)+cluster.worker.id} and connected to MongoDB.`);
  }
}
bootstrap();
