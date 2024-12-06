import { Component } from '@angular/core';
import { NavBreadcrumbComponent } from './nav-breadcrumb/nav-breadcrumb.component';
import { LogoComponent } from '../logo/logo.component';
import { BounceOnClickDirective } from '../directives/bounce-on-click.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavBreadcrumbComponent, LogoComponent, BounceOnClickDirective],
  templateUrl: './header.html',
})
export class HeaderComponent {}
