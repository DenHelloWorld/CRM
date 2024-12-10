import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BounceOnClickDirective } from '../../directives/bounce-on-click.directive';
import { AuthService } from '../../../features/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-system-menu',
    templateUrl: './system-menu.component.html',
    imports: [RouterModule, BounceOnClickDirective, CommonModule],
    providers: [AuthService]
})
export class SystemMenuComponent {
  public readonly authService = inject(AuthService);
}
