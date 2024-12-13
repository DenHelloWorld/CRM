import { Role } from '../users/users.models';

export interface LoginUser {
  email: string;
  password: string;
}
export interface CreateUser extends LoginUser {
  name: string;
  role: Role;
}

export interface RefreshToken {
  userId: string;
  oldRefreshToken: string;
}

export interface AuthTokens {
  id: string;
  accessToken: string;
  refreshToken: string;
}