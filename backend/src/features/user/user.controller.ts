import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  Put,
  Param,
  HttpStatus,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { ErrorResponse, SuccessResponse } from '../../app.models';
import { User } from '@prisma/client';
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
  ): Promise<
    SuccessResponse<Omit<User, 'password' | 'refreshToken'>> | ErrorResponse
  > {
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
    SuccessResponse<Omit<User, 'password' | 'refreshToken'>[]> | ErrorResponse
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
  ): Promise<
    SuccessResponse<Omit<User, 'password' | 'refreshToken'>> | ErrorResponse
  > {
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
  ): Promise<
    SuccessResponse<Omit<User, 'password' | 'refreshToken'>> | ErrorResponse
  > {
    return handleRequest(
      () => this.userService.update(dto, id),
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
    return handleRequest(
      () => this.userService.remove(id),
      'User removed successfully',
      HttpStatus.NO_CONTENT,
      'deleteUser',
    );
  }
}
