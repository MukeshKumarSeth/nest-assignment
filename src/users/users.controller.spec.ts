import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';

describe('UsersController', () => {
  let controller: UsersController;
  const dbConnectionURl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/userCrud';
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule.forRoot(dbConnectionURl),MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
