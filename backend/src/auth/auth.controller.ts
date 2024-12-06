import { ErrorResponse, SuccesResponse } from './../app.models';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegistrationUserDto } from './dto/auth.dto';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  async login(
    @Body() dto: LoginUserDto,
  ): Promise<
    | SuccesResponse<{ accessToken: string; refreshToken: string }>
    | ErrorResponse
  > {
    const tokens = await this.authService.login(dto);

    return {
      message: ['Successfully login'],
      payload: tokens,
      statusCode: HttpStatus.ACCEPTED,
    };
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  registration(@Body() dto: RegistrationUserDto) {
    console.log(dto); // Логируем данные, полученные из тела запроса
    return { message: 'Registration successful', user: dto };
  }
}
