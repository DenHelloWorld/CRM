import { Routes } from '@angular/router';
import { AuthGuard } from './features/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (x) => x.DashboardComponent,
      ),
    data: { headerBreadcrumb: 'Dashboard' },
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./features/users/users.component').then((x) => x.UsersComponent),
    data: { headerBreadcrumb: 'Users' },
    canActivate: [AuthGuard],
  },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./features/tasks/tasks.component').then((x) => x.TasksComponent),
    data: { headerBreadcrumb: 'Tasks' },
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./features/auth/auth.component').then((x) => x.AuthComponent),
    data: { headerBreadcrumb: 'Authentification' },
    children: [
      {
        path: 'sign-in',
        loadComponent: () =>
          import('./features/auth/login/login.component').then(
            (x) => x.LoginComponent,
          ),
        data: { headerBreadcrumb: 'Sign In' },
      },
      {
        path: 'sign-up',
        loadComponent: () =>
          import('./features/auth/create-user/create-user.component').then(
            (x) => x.CreateUserComponent,
          ),
        data: { headerBreadcrumb: 'Sign Up' },
      },
    ],
  },

  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },

  {
    path: '**',
    redirectTo: 'auth',
  },
];
