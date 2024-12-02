import { HttpStatus, HttpException } from '@nestjs/common';
import { User } from '@prisma/client';
import { ErrorResponse } from '../app.models';

const isUserNotFound = (user: Omit<User, 'password'>, id: string): void => {
  if (!user) {
    const errorResponse: ErrorResponse = {
      message: [`User with id ${id} not found`],
      error: 'Not found',
      statusCode: HttpStatus.NOT_FOUND,
    };

    throw new HttpException(errorResponse, HttpStatus.NOT_FOUND);
  }
};
export default isUserNotFound;
