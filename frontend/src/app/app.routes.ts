import { Routes } from '@angular/router';

export const routes: Routes = [  {
    path: 'customer',
    loadComponent: () =>
      import('./features/customer-dashboard/customer-dashboard.component').then((x) => x.CustomerDashboardComponent),
  },];
