import { Task } from "../tasks/tasks.models";

export type Role = 'USER' | 'ADMIN' | 'MODERATOR';
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  role: Role;
  password: string;
  tasks: Task[];
}
