import { HttpStatus } from '@nestjs/common';
import { SuccessResponse, ErrorResponse } from '../app.models';
import { handleHttpError } from './handleHttpError';

const handleRequest = async <T>(
  serviceMethod: () => Promise<T>,
  successMessage: string | string[],
  statusCode: HttpStatus,
  errorContext: string,
): Promise<SuccessResponse<T> | ErrorResponse> => {
  try {
    const payload = await serviceMethod();
    return {
      message: Array.isArray(successMessage)
        ? successMessage
        : [successMessage],
      payload,
      statusCode,
    };
  } catch (error) {
    return handleHttpError(error, errorContext);
  }
};
export default handleRequest;
