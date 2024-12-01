import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  // Patch,
  Param,
  HttpException,
  HttpStatus,
  // Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ErrorResponse, SuccesResponse } from '../../app.models';
import { User } from '@prisma/client';
import { FindUserByIdDto } from './dto/find-user-by-id.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<SuccesResponse<Omit<User, 'password'>>> {
    const user = await this.userService.create(createUserDto);
    return {
      message: ['User created successfully'],
      payload: user,
      statusCode: HttpStatus.CREATED,
    };
  }
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<SuccesResponse<Omit<User, 'password'>[]>> {
    const users = await this.userService.findAll();
    return {
      message: ['Users retrieved successfully'],
      payload: users,
      statusCode: HttpStatus.OK,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param() dto: FindUserByIdDto,
  ): Promise<SuccesResponse<Omit<User, 'password'>>> {
    const user = await this.userService.findOne(dto.id);

    if (!user) {
      const errorResponse: ErrorResponse = {
        message: [`User with id ${dto.id} not found`],
        error: 'Not found',
        statusCode: HttpStatus.NOT_FOUND,
      };

      throw new HttpException(errorResponse, HttpStatus.NOT_FOUND);
    }

    return {
      message: ['User retrieved successfully'],
      payload: user,
      statusCode: HttpStatus.OK,
    };
  }

  // @Patch(':id')
  // // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  // //   return this.userService.update(+id, updateUserDto);
  // // }
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
