import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { User } from '@prisma/client';
@Injectable()
export class UserService {
  @Inject(PrismaService) private readonly prisma: PrismaService;

  private readonly withoutPasswordToken = {
    id: true,
    email: true,
    name: true,
    createdAt: true,
    updatedAt: true,
    role: true,
    tasks: {
      select: {
        id: true,
        title: true,
        status: true,
        description: true,
      },
    },
    password: false,
    refreshToken: false,
  };

  // private readonly withoutPasswordToken = this.configService.get(
  //   'WITHOUT_PASSWORD_TOKEN',
  // );

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
      select: this.withoutPasswordToken,
    });
  }

  async findAll(): Promise<Omit<User, 'password' | 'refreshToken'>[]> {
    return await this.prisma.user.findMany({
      select: this.withoutPasswordToken,
    });
  }

  async findOne(
    id: string,
  ): Promise<Omit<User, 'password' | 'refreshToken'> | null> {
    return await this.prisma.user.findUnique({
      where: { id },
      select: this.withoutPasswordToken,
    });
  }

  async update(
    dto: UpdateUserDto,
  ): Promise<Omit<User, 'password' | 'refreshToken'>> {
    return await this.prisma.user.update({
      where: { id: dto.id },
      data: {
        ...dto,
      },
      select: this.withoutPasswordToken,
    });
  }

  async remove(id: string) {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
