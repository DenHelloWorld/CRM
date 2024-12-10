import { Role } from '../users/users.models';

export interface CreateUser {
  name: string;
  email: string;
  role: Role;
  password: string;
}
export interface LoginUser {
  email: string;
  password: string;
}

export interface RefreshToken {
  userId: string;
  oldRefreshToken: string;
}
