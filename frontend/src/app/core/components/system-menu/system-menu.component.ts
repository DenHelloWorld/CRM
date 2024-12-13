import { Component, effect, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BounceOnClickDirective } from '../../directives/bounce-on-click.directive';
import { CommonModule } from '@angular/common';
import GLOBAL_USER from '../../../features/auth/data/user.signal';

@Component({
  selector: 'app-system-menu',
  templateUrl: './system-menu.component.html',
  imports: [RouterModule, BounceOnClickDirective, CommonModule],
})
export class SystemMenuComponent {
  user = GLOBAL_USER;

  constructor() {
    effect(() => {
      this.user();
    });
  }
}
