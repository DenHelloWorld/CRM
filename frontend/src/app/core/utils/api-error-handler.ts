import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ErrorResponse } from '../../app.models';



const handleHttpError = (error: HttpErrorResponse): Observable<never> => {
  let errorMessage: ErrorResponse = {
    message: ['Something went wrong'],
    statusCode: error.status,
    error: error.error?.error || 'Unknown error',
  };

  if (error.error?.message) {
    errorMessage.message = Array.isArray(error.error.message)
      ? error.error.message
      : [error.error.message];
  }

  console.error('API Error:', errorMessage);
  return throwError(() => errorMessage);
};
export default handleHttpError;