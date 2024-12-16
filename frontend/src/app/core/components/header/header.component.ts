import { Component, effect } from '@angular/core';
import { NavBreadcrumbComponent } from './nav-breadcrumb/nav-breadcrumb.component';
import { LogoComponent } from '../logo/logo.component';
import { BounceOnClickDirective } from '../../directives/bounce-on-click.directive';
import GLOBAL_USER from '../../../features/auth/data/user.signal';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [NavBreadcrumbComponent, LogoComponent, BounceOnClickDirective, RouterModule],
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
