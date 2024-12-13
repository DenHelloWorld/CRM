import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import handleHttpError from '../../core/utils/api-error-handler';
import { SuccessResponse } from '../../app.models';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;
  private readonly endpoint = environment.endpoints.protected.users;

  async get<T>(): Promise<Observable<SuccessResponse<T>>> {
    return this.http
      .get<SuccessResponse<T>>(`${this.apiUrl}/${this.endpoint}`)
      .pipe(catchError(handleHttpError));
  }
}
