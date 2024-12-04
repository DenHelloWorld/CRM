import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/customer-dashboard/customer-dashboard.component').then(
        (x) => x.CustomerDashboardComponent,
      ),
    data: { headerBreadcrumb: 'Customer Dashboard' },
  },
];
