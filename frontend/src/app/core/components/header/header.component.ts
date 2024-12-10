import { Component, inject } from '@angular/core';
import { NavBreadcrumbComponent } from './nav-breadcrumb/nav-breadcrumb.component';
import { LogoComponent } from '../logo/logo.component';
import { BounceOnClickDirective } from '../../directives/bounce-on-click.directive';
import { AuthService } from '../../../features/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavBreadcrumbComponent, LogoComponent, BounceOnClickDirective],
  templateUrl: './header.html',
  providers: [AuthService],
})
export class HeaderComponent {
  public readonly authService = inject(AuthService);

}
