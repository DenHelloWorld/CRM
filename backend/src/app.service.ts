import { Injectable } from '@nestjs/common';
import 'dotenv/config';

@Injectable()
export class AppService {
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
  getHello(): string {
    return 'Hello World!';
  }
}
