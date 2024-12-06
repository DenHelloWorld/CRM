import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  Put,
  Param,
  HttpException,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ErrorResponse, SuccesResponse } from '../../app.models';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import isNotUuidError from '../../helpers/isNotUuidError';
import isUserNotFound from '../../helpers/isUserNotFound';

@Controller('users')
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
    @Param('id') id: string,
  ): Promise<SuccesResponse<Omit<User, 'password'>>> {
    isNotUuidError(id);

    const user = await this.userService.findOne(id);

    isUserNotFound(user, id);

    return {
      message: ['User retrieved successfully'],
      payload: user,
      statusCode: HttpStatus.OK,
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    isNotUuidError(id);

    const user = await this.userService.findOne(id);

    isUserNotFound(user, id);

    if ('password' in dto) {
      const errorResponse: ErrorResponse = {
        message: ['Updating password is not allowed via this endpoint'],
        error: 'Forbidden',
        statusCode: HttpStatus.FORBIDDEN,
      };

      throw new HttpException(errorResponse, HttpStatus.FORBIDDEN);
    }
    const updatedUser = await this.userService.update(user, dto);

    return {
      message: ['User updateted successfully'],
      payload: updatedUser,
      statusCode: HttpStatus.OK,
    };
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    isNotUuidError(id);

    const user = await this.userService.findOne(id);

    isUserNotFound(user, id);

    return await this.userService.remove(id);
  }
}
