import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { User } from '@prisma/client';
@Injectable()
export class UserService {
  @Inject(PrismaService) private readonly prisma: PrismaService;

  private readonly userWithoutPasswordSelect = {
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
  };

  async create(dto: CreateUserDto): Promise<Omit<User, 'password'>> {
    return await this.prisma.user.create({
      data: {
        ...dto,
      },
      select: this.userWithoutPasswordSelect,
    });
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    return await this.prisma.user.findMany({
      select: this.userWithoutPasswordSelect,
    });
  }

  async findOne(id: string): Promise<Omit<User, 'password'> | null> {
    return await this.prisma.user.findUnique({
      where: { id },
      select: this.userWithoutPasswordSelect,
    });
  }

  async update(
    user: Omit<User, 'password'>,
    dto: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    return await this.prisma.user.update({
      where: { id: user.id },
      data: {
        ...dto,
      },
      select: this.userWithoutPasswordSelect,
    });
  }

  async remove(id: string) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
