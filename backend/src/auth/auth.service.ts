import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  LoginUserDto,
  RefreshTokenDto,
  RegistrationUserDto,
} from './dto/auth.dto';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../features/user/user.service';
import { Role, User } from '@prisma/client';
import CONSTANTS from '../constants';

@Injectable()
export class AuthService {
  @Inject(PrismaService) private readonly prisma: PrismaService;
  @Inject(JwtService) private readonly jwtService: JwtService;
  @Inject(UserService) private readonly userService: UserService;

  public async login(dto: LoginUserDto): Promise<
    Omit<User, 'password'> & {
      accessToken: string;
      refreshToken: string;
    }
  > {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    const isDataValid =
      user && (await bcrypt.compare(dto.password, user.password));

    if (!isDataValid) {
      throw new UnauthorizedException('Invalid login or password');
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(user.id, user.email, user.role),
      this.generateRefreshToken(user.id, user.email, user.role),
    ]);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    const { password, ...userWithoutSensitiveData } = user;
    void password;

    return {
      ...userWithoutSensitiveData,
      accessToken,
      refreshToken,
    };
  }

  public async registerUser(dto: RegistrationUserDto): Promise<void> {
    const userExists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (userExists) {
      throw new ConflictException('The user with this email already exists');
    }

    await this.createUser(dto);
  }

  public async refreshToken(
    dto: RefreshTokenDto,
  ): Promise<{ id: string; accessToken: string; refreshToken: string }> {
    const user = await this.prisma.user.findUnique({
      where: { id: dto.userId },
    });

    if (!user || user.refreshToken !== dto.oldRefreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const newAccessToken = this.generateAccessToken(
      user.id,
      user.email,
      user.role,
    );
    const newRefreshToken = this.generateRefreshToken(
      user.id,
      user.email,
      user.role,
    );

    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefreshToken },
    });

    return {
      id: user.id,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  private generateAccessToken(
    userId: string,
    email: string,
    role: Role,
  ): string {
    const payload = {
      userId,
      email,
      role,
      iat: Math.floor(Date.now() / 1000),
    };

    try {
      return this.jwtService.sign(payload, {
        secret: CONSTANTS.jwtSecret,
        expiresIn: CONSTANTS.tokenExpireTime,
        algorithm: 'HS256',
      });
    } catch {
      throw new InternalServerErrorException('Error generating access token');
    }
  }

  private generateRefreshToken(
    userId: string,
    email: string,
    role: string,
  ): string {
    const payload = {
      userId,
      email,
      role,
      iat: Math.floor(Date.now() / 1000),
    };

    try {
      return this.jwtService.sign(payload, {
        secret: CONSTANTS.jwtRefreshSecret,
        expiresIn: CONSTANTS.tokenExpireTime,
        algorithm: 'HS256',
      });
    } catch {
      throw new InternalServerErrorException('Error generating refresh token');
    }
  }

  private async createUser(
    dto: RegistrationUserDto,
  ): Promise<Omit<User, 'password' | 'refreshToken'>> {
    const hashedPassword = await bcrypt.hash(
      dto.password,
      +CONSTANTS.cryptSalt,
    );
    dto.password = hashedPassword;

    const user = await this.userService.create(dto);
    return { ...user };
  }
}
