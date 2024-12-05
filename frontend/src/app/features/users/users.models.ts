export type Role = 'USER' | 'ADMIN' | 'MODERATOR';
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  role: Role;
  password: string;
}
