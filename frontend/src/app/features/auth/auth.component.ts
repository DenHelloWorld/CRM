import { Component, effect, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BounceOnClickDirective } from '../../core/directives/bounce-on-click.directive';
import GLOBAL_USER from './data/user.signal';


@Component({
  selector: 'app-auth',
  providers: [AuthService],
  imports: [RouterOutlet, CommonModule, BounceOnClickDirective, RouterModule],
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  readonly authService: AuthService = inject(AuthService);
  readonly user = GLOBAL_USER;

  constructor() {
    effect(() => {
      this.user();
    });
  }
}
