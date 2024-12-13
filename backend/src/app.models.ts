import { HttpStatus } from '@nestjs/common';

export interface Response {
  message: string[];
  statusCode: HttpStatus;
}
export interface SuccessResponse<T> extends Response {
  payload: T;
}

export interface ErrorResponse extends Response {
  error: string;
}
