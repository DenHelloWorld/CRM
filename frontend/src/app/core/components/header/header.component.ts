import { Component, effect, inject } from '@angular/core';
import { NavBreadcrumbComponent } from './nav-breadcrumb/nav-breadcrumb.component';
import { LogoComponent } from '../logo/logo.component';
import { BounceOnClickDirective } from '../../directives/bounce-on-click.directive';
import GLOBAL_USER from '../../../features/auth/data/user.signal';

@Component({
  selector: 'app-header',
  imports: [NavBreadcrumbComponent, LogoComponent, BounceOnClickDirective],
  templateUrl: './header.html',
})
export class HeaderComponent {
  readonly user = GLOBAL_USER;

  constructor() {
    effect(() => {
      this.user();
    });
  }
}
