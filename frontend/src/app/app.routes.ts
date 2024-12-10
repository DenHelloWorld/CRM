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
