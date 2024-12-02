import { Role } from '@prisma/client';
import { IsOptional, IsString, IsEmail, IsEnum } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsEnum(Role)
  role?: Role;
}
