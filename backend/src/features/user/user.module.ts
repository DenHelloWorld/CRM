import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtAuthGuard } from '../../auth/jwt.guard';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [JwtModule],
  controllers: [UserController],
  providers: [UserService, JwtAuthGuard, ConfigService],
  exports: [ConfigService],
})
export class UserModule {}
