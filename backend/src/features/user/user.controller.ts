import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse, StatusResponse } from '../../app.models';
import { User } from '@prisma/client';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ApiResponse<Omit<User, 'password'>>> {
    const user = await this.userService.create(createUserDto);
    return {
      status: StatusResponse.CREATED,
      message: 'User created successfully',
      payload: user,
    };
  }
  @Get()
  @HttpCode(200)
  async findAll(): Promise<ApiResponse<Omit<User, 'password'>[]>> {
    const users = await this.userService.findAll();
    return {
      status: StatusResponse.SUCCESS,
      message: 'Users retrieved successfully',
      payload: users,
    };
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  // //   return this.userService.update(+id, updateUserDto);
  // // }
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
