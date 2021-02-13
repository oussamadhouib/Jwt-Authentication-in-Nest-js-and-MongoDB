import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';



@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {

    }

    @Post('create') 
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.create(createUserDto);
    }


}