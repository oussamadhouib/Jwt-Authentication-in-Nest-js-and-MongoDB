import { Model } from 'mongoose';
import { Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private userModel: Model<User>) {}

  @UsePipes(new ValidationPipe())
  async create(createUserDto: CreateUserDto) {

    let createdUser = new this.userModel(createUserDto);
    return await createdUser.save();

  }

}