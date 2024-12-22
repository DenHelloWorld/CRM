import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from '../../auth/jwt.guard';
import { Task } from '@prisma/client';
import { ErrorResponse, SuccessResponse } from '../../app.models';
import handleRequest from '../../helpers/handleRequest';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<SuccessResponse<Task> | ErrorResponse> {
    return handleRequest(
      () => this.taskService.create(createTaskDto),
      'Task created successfully',
      HttpStatus.CREATED,
      'createTask',
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<SuccessResponse<Task[]> | ErrorResponse> {
    return handleRequest(
      () => this.taskService.findAll(),
      'Tasks retrieved successfully',
      HttpStatus.OK,
      'getTasks',
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  // @Put(':id')
  // @HttpCode(HttpStatus.OK)
  // update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
  //   return this.taskService.update(+id, updateTaskDto);
  // }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
