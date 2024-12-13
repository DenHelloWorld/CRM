import { inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SecureStorageService } from '../../core/services/secure-local-storage.service';
import { AuthTokens } from './auth.models';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly secureStorage = inject(SecureStorageService);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    try {
      console.log('AuthInterceptor launch');
      const tokens: AuthTokens | null = this.secureStorage.get('tokensCRM');
      console.log('AuthInterceptor tokens:', tokens);
      const accessToken = tokens?.accessToken;

      const protectedEndpoints = Object.values(environment.endpoints.protected);
      const isProtected = protectedEndpoints.some((endpoint) =>
        req.url.includes(endpoint),
      );

      if (isProtected && accessToken) {
        const clonedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return next.handle(clonedReq);
      }

      return next.handle(req);
    } catch (error) {
      console.error('Error in AuthInterceptor:', error);
      return next.handle(req);
    }
  }
}
