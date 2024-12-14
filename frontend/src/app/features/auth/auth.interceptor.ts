import { inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthTokens } from './auth.models';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { SuccessResponse } from '../../app.models';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly authService = inject(AuthService);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const tokens = this.authService.getTokensFromLs();
    const accessToken = tokens?.accessToken;
    const isProtected = this.isProtectedEndpoint(req);

    if (isProtected) {
      return this.handleProtectedRequest(req, next, accessToken, tokens);
    }

    return next.handle(req);
  }

  private isProtectedEndpoint(req: HttpRequest<any>): boolean {
    const protectedEndpoints = Object.values(environment.endpoints.protected);
    return protectedEndpoints.some((endpoint) => req.url.includes(endpoint));
  }

  private handleProtectedRequest(
    req: HttpRequest<any>,
    next: HttpHandler,
    accessToken: string | undefined,
    tokens: AuthTokens | null,
  ): Observable<HttpEvent<any>> {
    if (accessToken && !this.authService.isTokenExpired(accessToken)) {
      return this.addAuthorizationHeader(req, next, accessToken);
    } else if (tokens?.refreshToken) {
      return this.refreshTokens(req, next, tokens);
    } else {
      this.authService.logout();
      console.error('No valid tokens available');
      return throwError(() => new Error('No valid tokens available'));
    }
  }

  private refreshTokens(
    req: HttpRequest<any>,
    next: HttpHandler,
    tokens: any,
  ): Observable<HttpEvent<any>> {
    return this.authService
      .refresh({ oldRefreshToken: tokens.refreshToken, userId: tokens.id })
      .pipe(
        switchMap((newTokens: SuccessResponse<AuthTokens>) => {
          this.authService.setTokensInLs(newTokens.payload);
          return this.addAuthorizationHeader(
            req,
            next,
            newTokens.payload.accessToken,
          );
        }),
        catchError((error) => {
          console.error('Token refresh failed', error);
          this.authService.logout();
          return throwError(() => new Error('No valid tokens available'));
        }),
      );
  }

  private addAuthorizationHeader(
    req: HttpRequest<any>,
    next: HttpHandler,
    accessToken: string,
  ): Observable<HttpEvent<any>> {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return next.handle(clonedReq);
  }
}
