import { WritableSignal } from '@angular/core';
import { Task } from '../tasks/tasks.models';

export enum Role {
  Admin = 'ADMIN',
  User = 'USER',
  Moderator = 'MODERATOR',
  Guest = 'GUEST'
}
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  role: Role;
  password: string;
  tasks: Task[];
  authStatus: WritableSignal<boolean>;
}
