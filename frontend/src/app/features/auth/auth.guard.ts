import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private readonly authService = inject(AuthService);
  private readonly user = this.authService.currrentuser;
  private readonly router = inject(Router);

  canActivate(): boolean {
    const isAuthenticated = this.user.authStatus();

    if (!isAuthenticated) {
      this.router.navigate(['/auth']);
      return false;
    }

    return true;
  }
}
