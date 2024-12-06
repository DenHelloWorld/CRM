import { CreateUserDto } from '../../features/user/dto/users.dto';
import { PickType } from '@nestjs/mapped-types';

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
] as const) {
  accessToken: string;

  refreshToken: string;
}

export class RegistrationUserDto extends CreateUserDto {}
