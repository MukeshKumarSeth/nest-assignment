import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RouterModule } from '@nestjs/core';
@Module({
  imports: [ConfigModule,MongooseModule.forRoot('mongodb://127.0.0.1:27017/userCrud'), RouterModule.register([
    {
      path: 'api', // Global route prefix for users module
      module: UsersModule,
    },
  ]),UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}