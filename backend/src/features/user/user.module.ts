import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtAuthGuard } from '../../auth/jwt.guard';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../prisma/prisma.service';

@Module({
  imports: [JwtModule],
  controllers: [UserController],
  providers: [UserService, JwtAuthGuard, ConfigService, PrismaService],
  exports: [ConfigService],
})
export class UserModule {}
