import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class TaskService {
  @Inject(PrismaService) private readonly prisma: PrismaService;

  async create(dto: CreateTaskDto): Promise<Task> {
    return await this.prisma.task.create({ data: dto });
  }

  async findAll(): Promise<Task[]> {
    return await this.prisma.task.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  // update(id: number, updateTaskDto: UpdateTaskDto) {
  //   return `This action updates a #${id} task`;
  // }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
