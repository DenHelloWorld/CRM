import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (x) => x.DashboardComponent,
      ),
    data: { headerBreadcrumb: 'Dashboard' },
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./features/users/users.component').then((x) => x.UsersComponent),
    data: { headerBreadcrumb: 'Users' },
  },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./features/tasks/tasks.component').then((x) => x.TasksComponent),
    data: { headerBreadcrumb: 'Tasks' },
  },
];
