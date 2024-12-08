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
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { ErrorResponse, SuccessResponse } from '../../app.models';
import { User } from '@prisma/client';
import isNotUuidError from '../../helpers/isNotUuidError';
import isUserNotFound from '../../helpers/isUserNotFound';
import { JwtAuthGuard } from '../../auth/jwt.guard';
import handleRequest from '../../helpers/handleRequest';
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<SuccessResponse<Omit<User, 'password'>> | ErrorResponse> {
    return handleRequest(
      () => this.userService.create(createUserDto),
      'User created successfully',
      HttpStatus.CREATED,
      'createUser',
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<
    SuccessResponse<Omit<User, 'password'>[]> | ErrorResponse
  > {
    return handleRequest(
      () => this.userService.findAll(),
      'Users retrieved successfully',
      HttpStatus.OK,
      'getUsers',
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id') id: string,
  ): Promise<SuccessResponse<Omit<User, 'password'>> | ErrorResponse> {
    isNotUuidError(id);
    const user = await this.userService.findOne(id);
    isUserNotFound(user, id);

    return handleRequest(
      () => this.userService.findOne(id),
      'User retrieved successfully',
      HttpStatus.OK,
      'getUser',
    );
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<SuccessResponse<Omit<User, 'password'>> | ErrorResponse> {
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

    return handleRequest(
      () => this.userService.update(dto),
      'User updated successfully',
      HttpStatus.OK,
      'updateUser',
    );
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id') id: string,
  ): Promise<SuccessResponse<void> | ErrorResponse> {
    isNotUuidError(id);
    const user = await this.userService.findOne(id);
    isUserNotFound(user, id);

    return handleRequest(
      () => this.userService.remove(id),
      'User removed successfully',
      HttpStatus.NO_CONTENT,
      'deleteUser',
    );
  }
}
