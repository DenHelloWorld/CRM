import { IsString, IsUUID } from 'class-validator';
import { CreateUserDto } from '../../features/user/dto/users.dto';
import { PickType } from '@nestjs/mapped-types';

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
] as const) {}

export class RegistrationUserDto extends CreateUserDto {}
export class RefreshTokenDto {
  @IsUUID()
  userId: string;

  @IsString()
  oldRefreshToken: string;
}
