import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorResponse } from '../app.models';

export const handleHttpError = (
  error: unknown,
  operation: string,
): ErrorResponse => {
  if (error instanceof HttpException) {
    return {
      message: [`Operation: '${operation}' failed`],
      error: error.message,
      statusCode: error.getStatus(),
    };
  }

  return {
    message: ['Unexpected error occurred'],
    error: error instanceof Error ? error.message : 'Unknown error',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  };
};
