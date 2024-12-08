import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { User } from '@prisma/client';
import CONSTANTS from '../../constants';

@Injectable()
export class UserService {
  @Inject(PrismaService) private readonly prisma: PrismaService;

  async updateRefreshToken(userId: string, refreshToken: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken },
    });
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  async create(
    dto: CreateUserDto,
  ): Promise<Omit<User, 'password' | 'refreshToken'>> {
    return await this.prisma.user.create({
      data: {
        ...dto,
      },
      select: CONSTANTS.withoutPasswordToken,
    });
  }

  async findAll(): Promise<Omit<User, 'password' | 'refreshToken'>[]> {
    return await this.prisma.user.findMany({
      select: CONSTANTS.withoutPasswordToken,
    });
  }

  async findOne(
    id: string,
  ): Promise<Omit<User, 'password' | 'refreshToken'> | null> {
    return await this.prisma.user.findUnique({
      where: { id },
      select: CONSTANTS.withoutPasswordToken,
    });
  }

  async update(
    dto: UpdateUserDto,
    id: string,
  ): Promise<Omit<User, 'password' | 'refreshToken'>> {
    this.findOne(id);
    return await this.prisma.user.update({
      where: { id },
      data: {
        ...dto,
      },
      select: CONSTANTS.withoutPasswordToken,
    });
  }

  async remove(id: string) {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
