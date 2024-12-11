import { inject, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { SecureStorageService } from '../../core/services/secure-local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly secureStorage = inject(SecureStorageService);
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.secureStorage.get('tokensCRM');

    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      return next.handle(cloned);
    }

    return next.handle(req);
  }
}
