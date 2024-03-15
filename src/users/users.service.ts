import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }
  async create(createUserDto: CreateUserDto) {
    try {
      const newUuid = uuidv4();
      Object.assign(createUserDto, { id: newUuid });
      const newUser = new this.userModel(createUserDto);
      const userResp = await newUser.save();
      Logger.log('In user creation method');
      return userResp;
    } catch (err) {
      Logger.error('error', err);
      throw new HttpException('Error creating user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll() {
    try {
      Logger.log('In find all user method');
      return this.userModel.find().exec();
    } catch (err) {
      Logger.error('error', err);
      throw new HttpException('Error in fin all user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findOne(id: string) {
    try {
      Logger.log('In find user by id method');
      return this.userModel.findOne({ id: id }).exec();
    } catch (err) {
      Logger.error('error', err);
      throw new HttpException('Error in finding user by id', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    try {
      Logger.log('In user updation method');
      // Fetch the existing user by ID
      const user = await this.userModel.findOne({id:userId});
      //if no data found on current id
      if (!user) {
        return;
      }
      return this.userModel.updateOne({ id: userId }, updateUserDto).exec();
    } catch (err) {
      Logger.error('error', err);
      throw new HttpException('Error creating user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id:string) {
    try {

      Logger.log('In user remove method');
      const user = await this.userModel.findOne({id:id});
      //if no data found on current id
      if (!user) {
        return;
      }
      // Delete the user
      return await this.userModel.deleteOne({id:id});

    } catch (err) {
      Logger.error('error', err);
      throw new HttpException('Error in removing user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
