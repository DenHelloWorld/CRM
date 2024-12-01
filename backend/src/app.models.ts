export enum StatusResponse {
  SUCCESS = 'success',
  ERROR = 'error',
  NOT_FOUND = 'not_found',
  UNAUTHORIZED = 'unauthorized',
  FORBIDDEN = 'forbidden',
  VALIDATION_ERROR = 'validation_error',
  INTERNAL_SERVER_ERROR = 'internal_server_error',
  CREATED = 'created',
  UPDATED = 'updated',
  DELETED = 'deleted',
  PENDING = 'pending',
}
export interface ApiResponse<T> {
  status: StatusResponse;
  message: string;
  payload: T;
}
