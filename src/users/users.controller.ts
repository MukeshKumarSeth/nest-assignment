import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseMessage } from '../utils/response.decorator';
import { USER, USER_BY_ID, USER_CREATED, USER_DELETED, USER_UPDATED } from '../utils/response.constants';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ResponseMessage(USER_CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ResponseMessage(USER)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ResponseMessage(USER_BY_ID)
  async findOne(@Param('id') id: string) {
    const userData = await this.usersService.findOne(id);
    if(!userData){
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return userData;
  }

  @Patch(':id')
  @ResponseMessage(USER_UPDATED)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const userUpdateResp = await this.usersService.update(id, updateUserDto);
    if(!userUpdateResp){
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return userUpdateResp
  }

  @Delete(':id')
  @ResponseMessage(USER_DELETED)
  async remove(@Param('id') id: string) {
    const userDelResp = await this.usersService.remove(id);
    if(!userDelResp){
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return userDelResp;
  }
}
