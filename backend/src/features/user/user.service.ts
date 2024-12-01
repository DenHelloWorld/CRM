import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
