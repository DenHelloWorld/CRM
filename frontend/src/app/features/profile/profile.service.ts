import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../users/users.models';
import { environment } from '../../../environments/environment';
import { SuccessResponse } from '../../app.models';
import { catchError, Observable } from 'rxjs';
import handleHttpError from '../../core/utils/api-error-handler';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;
  private readonly endpoints = environment.endpoints;

  async editCredentials<T>(
    dto: Omit<
      User,
      'id' | 'createdAt' | 'updatedAt' | 'password' | 'tasks' | 'authStatus'
    >,
    id: User['id'],
  ): Promise<Observable<SuccessResponse<T>>> {
    return this.http
      .put<SuccessResponse<T>>(
        `${this.apiUrl}/${this.endpoints.protected.users}/${id}`,
        dto,
      )
      .pipe(catchError(handleHttpError));
  }
}
