import { signal } from '@angular/core';
import { User, Role } from '../../users/users.models';

const GLOBAL_USER = signal<User>({
  id: '',
  email: '',
  name: '',
  createdAt: '',
  updatedAt: '',
  role: Role.Guest,
  password: '',
  tasks: [],
  authStatus: false,
});
export default GLOBAL_USER;
