import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RouterModule } from '@nestjs/core';
const dbConnectionURl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/userCrud';
@Module({
  imports: [ConfigModule,MongooseModule.forRoot(dbConnectionURl), RouterModule.register([
    {
      path: 'api', // Global route prefix for users module
      module: UsersModule,
    },
  ]),UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}