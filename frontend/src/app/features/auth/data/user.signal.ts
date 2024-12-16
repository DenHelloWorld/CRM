import { signal } from '@angular/core';
import { User, Role } from '../../users/users.models';

export const INIT_USER: User = {
  id: '',
  email: '',
  name: '',
  createdAt: '',
  updatedAt: '',
  role: Role.Guest,
  password: '',
  tasks: [],
  authStatus: false,
};

const GLOBAL_USER = signal<User>({
  ...INIT_USER,
});
export default GLOBAL_USER;
