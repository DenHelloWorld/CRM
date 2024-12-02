import { HttpStatus, HttpException } from '@nestjs/common';
import { validate } from 'uuid';
import { ErrorResponse } from '../app.models';

const isNotUuidError = (id: string): void => {
  if (!validate(id)) {
    const errorResponse: ErrorResponse = {
      message: [`The provided id (${id}) is not a valid UUID.`],
      error: 'Bad request',
      statusCode: HttpStatus.BAD_REQUEST,
    };

    throw new HttpException(errorResponse, HttpStatus.BAD_REQUEST);
  }
};
export default isNotUuidError;
