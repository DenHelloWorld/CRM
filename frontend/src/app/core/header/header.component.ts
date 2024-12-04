import { Component } from '@angular/core';
import { NavBreadcrumbComponent } from './nav-breadcrumb/nav-breadcrumb.component';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavBreadcrumbComponent, LogoComponent],
  templateUrl: './header.html',
})
export class HeaderComponent {}
