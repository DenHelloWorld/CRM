import { inject, Injectable } from '@angular/core';
import { User } from '../users/users.models';
import { environment } from '../../../environments/environment';
import { catchError, Observable, tap } from 'rxjs';
import { SuccessResponse } from '../../app.models';
import handleHttpError from '../../core/utils/api-error-handler';
import { SecureStorageService } from '../../core/services/secure-local-storage.service';
import { AuthTokens, CreateUser, LoginUser, RefreshToken } from './auth.models';
import { HttpClient } from '@angular/common/http';
import { GLOBAL_USER } from './user.signal';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly secureStorage = inject(SecureStorageService);
  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;
  private readonly endpoints = environment.endpoints;

  register(dto: CreateUser): Observable<SuccessResponse<void>> {
    return this.http
      .post<SuccessResponse<void>>(
        `${this.apiUrl}/${this.endpoints.register}`,
        dto,
      )
      .pipe(catchError(handleHttpError));
  }

  login(dto: LoginUser): Observable<
    SuccessResponse<
      Omit<User, 'password'> & {
        accessToken: string;
        refreshToken: string;
      }
    >
  > {
    return this.http
      .post<
        SuccessResponse<
          Omit<User, 'password'> & {
            accessToken: string;
            refreshToken: string;
          }
        >
      >(`${this.apiUrl}/${this.endpoints.login}`, dto)
      .pipe(
        catchError(handleHttpError),
        tap((response) => {
          const {
            accessToken,
            refreshToken,
            id,
            email,
            name,
            createdAt,
            updatedAt,
            role,
          } = response.payload;
          const tokens = { accessToken, refreshToken, id };
          const user = { id, email, name, createdAt, updatedAt, role };

          GLOBAL_USER.update((oldData) => ({
            ...oldData,
            authStatus: true,
            ...user,
          }));

          this.setTokensInLs(tokens);
          this.setUserInLs(user);
        }),
      );
  }

  refresh(
    dto: RefreshToken,
  ): Observable<
    SuccessResponse<{ id: string; accessToken: string; refreshToken: string }>
  > {
    return this.http
      .post<
        SuccessResponse<{
          id: string;
          accessToken: string;
          refreshToken: string;
        }>
      >(`${this.apiUrl}/${this.endpoints.refresh}`, dto)
      .pipe(
        catchError(handleHttpError),
        tap((response) => {
          this.setTokensInLs(response.payload);
        }),
      );
  }

  logout() {
    this.secureStorage.remove('userCRM');
    this.secureStorage.remove('tokensCRM');
    GLOBAL_USER.update((user) => ({
      ...user,
      authStatus: false,
    }));
  }

  setTokensInLs(tokens: AuthTokens) {
    console.log('setTokens', tokens);
    this.secureStorage.set('tokensCRM', tokens);
  }

  setUserInLs(user: Omit<User, 'password' | 'tasks' | 'authStatus'>) {
    console.log('setUserInLs', user);
    this.secureStorage.set('userCRM', user);
  }

  isAuthenticated(): boolean {
    return !!this.secureStorage.get('tokensCRM');
  }
}
