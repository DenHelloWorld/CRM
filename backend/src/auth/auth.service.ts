import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto, RegistrationUserDto } from './dto/auth.dto';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  @Inject(PrismaService) private readonly prisma: PrismaService;
  @Inject(JwtService) private readonly jwtService: JwtService;
  async login(
    dto: LoginUserDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid login or password');
    }
    console.log(user);
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid login or password');
    }
    const accessToken = this.generateAccessToken(user.id, user.email);
    const refreshToken = this.generateRefreshToken(user.id, user.email);

    return {
      accessToken,
      refreshToken,
    };
  }
  registration(dto: RegistrationUserDto) {
    console.log(dto);
  }

  private generateAccessToken(userId: string, email: string): string {
    const payload = { userId, email };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });
  }

  private generateRefreshToken(userId: string, email: string): string {
    const payload = { userId, email };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });
  }
}
