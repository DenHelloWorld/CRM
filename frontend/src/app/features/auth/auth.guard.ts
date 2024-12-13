import { Injectable, effect, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import GLOBAL_USER from './data/user.signal';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private readonly user = GLOBAL_USER;
  private readonly router = inject(Router);

  constructor() {
    effect(() => {
      console.log('User  in AuthGuard:', this.user());
    });
  }

  canActivate(): boolean {
    const isAuthenticated = this.user().authStatus;

    if (!isAuthenticated) {
      this.router.navigate(['/auth']);
      return false;
    }

    return true;
  }
}
