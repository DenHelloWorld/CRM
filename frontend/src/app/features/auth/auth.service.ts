import { inject, Injectable, signal } from '@angular/core';
import { Role, User } from '../users/users.models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { SuccessResponse } from '../../app.models';
import handleHttpError from '../../core/utils/api-error-handler';
import { SecureStorageService } from '../../core/services/secure-local-storage.service';
import { CreateUser, LoginUser, RefreshToken } from './auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly secureStorage = inject(SecureStorageService);
  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;
  private readonly endpoints = environment.endpoints;

  currrentuser: User = {
    id: '',
    email: '',
    name: '',
    createdAt: '',
    updatedAt: '',
    role: Role.Guest,
    password: '',
    tasks: [],
    authStatus: signal<boolean>(this.isAuthenticated()),
  };

  // Метод регистрации
  register(dto: CreateUser): Observable<SuccessResponse<User>> {
    return this.http
      .post<SuccessResponse<User>>(
        `${this.apiUrl}/${this.endpoints.register}`,
        dto,
      )
      .pipe(
        catchError(handleHttpError),
        tap((response) => {
          this.currrentuser = response.payload;
          this.secureStorage.set('userCRM', response.payload);
        }),
      );
  }

  login(
    dto: LoginUser,
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
      >(`${this.apiUrl}/${this.endpoints.login}`, dto)
      .pipe(
        catchError(handleHttpError),
        tap((response) => {
          this.setTokens(response.payload);
          this.currrentuser.authStatus.set(true);
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
          this.setTokens(response.payload);
        }),
      );
  }

  logout() {
    this.secureStorage.remove('userCRM');
    this.secureStorage.remove('tokensCRM');
    this.currrentuser.authStatus.set(false);
  }

  setTokens(tokens: { id: string; accessToken: string; refreshToken: string }) {
    this.secureStorage.set('tokensCRM', tokens);
  }

  getTokens() {
    return this.secureStorage.get('tokensCRM');
  }

  isAuthenticated(): boolean {
    return !!this.secureStorage.get('tokensCRM');
  }
}
