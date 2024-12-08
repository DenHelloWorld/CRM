import { ErrorResponse, SuccessResponse } from './../app.models';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginUserDto,
  RefreshTokenDto,
  RegistrationUserDto,
} from './dto/auth.dto';
import { Public } from './auth.decorators';
import { User } from '@prisma/client';
import handleRequest from '../helpers/handleRequest';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.ACCEPTED)
  async login(
    @Body() dto: LoginUserDto,
  ): Promise<
    | SuccessResponse<{ id: string; accessToken: string; refreshToken: string }>
    | ErrorResponse
  > {
    return handleRequest(
      () => this.authService.login(dto),
      'Successfully login',
      HttpStatus.ACCEPTED,
      'login',
    );
  }

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async registration(
    @Body() dto: RegistrationUserDto,
  ): Promise<
    SuccessResponse<Omit<User, 'password' | 'refreshToken'>> | ErrorResponse
  > {
    return handleRequest(
      () => this.authService.registerUser(dto),
      [
        'User registered successfully',
        'Now you can login in "auth/login" endpoint',
      ],
      HttpStatus.CREATED,
      'register',
    );
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.ACCEPTED)
  async refresh(
    @Body() dto: RefreshTokenDto,
  ): Promise<
    | SuccessResponse<{ accessToken: string; refreshToken: string }>
    | ErrorResponse
  > {
    return handleRequest(
      () => this.authService.refreshToken(dto),
      'Token refresh successfully',
      HttpStatus.ACCEPTED,
      'refresh',
    );
  }
}
