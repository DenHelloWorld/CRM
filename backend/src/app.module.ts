import { Module } from '@nestjs/common';
import { UserModule } from './features/user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { TaskModule } from './features/task/task.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, ConfigModule, TaskModule],
})
export class AppModule {}
