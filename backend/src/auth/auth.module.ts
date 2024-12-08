import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { UserService } from '../features/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.stategy';
import CONSTANTS from '../constants';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: CONSTANTS.jwtSecret,
        signOptions: {
          expiresIn: CONSTANTS.tokenExpireTime,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserService],
})
export class AuthModule {}
