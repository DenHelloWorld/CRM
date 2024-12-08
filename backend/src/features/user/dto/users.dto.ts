import {
  IsString,
  IsEmail,
  IsEnum,
  IsStrongPassword,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(Role)
  role: Role;

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    {
      message:
        'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, and be at least 8 characters long.',
    },
  )
  password: string;
}
export class UpdateUserDto {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsEnum(Role)
  role?: Role;
}
