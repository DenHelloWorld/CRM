import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BounceOnClickDirective } from '../../core/directives/bounce-on-click.directive';

@Component({
  selector: 'app-auth',
  providers: [AuthService],
  imports: [RouterOutlet, CommonModule, BounceOnClickDirective, RouterModule],
  templateUrl: './auth.component.html',
})
export class AuthComponent {}
