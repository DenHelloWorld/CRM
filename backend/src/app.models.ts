export enum StatusResponse {
  SUCCESS = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  ERROR = 400,
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  VALIDATION_ERROR = 422,
  INTERNAL_SERVER_ERROR = 500,
  PENDING = 102,
}

export interface Response {
  message: string[];
  statusCode: StatusResponse;
}
export interface SuccesResponse<T> extends Response {
  payload?: T;
}

export interface ErrorResponse extends Response {
  error?: string;
}
