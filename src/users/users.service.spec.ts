import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';

describe('UsersService', () => {
  let service: UsersService;
  const dbConnectionURl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/userCrud';
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongooseModule.forRoot(dbConnectionURl),MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
