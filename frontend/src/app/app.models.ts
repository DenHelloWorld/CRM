export interface Response {
  message: string[];
  statusCode: number;
}
export interface SuccessResponse<T> extends Response {
  payload: T;
}

export interface ErrorResponse extends Response {
  error: string;
}

export const endpoints = {
  user: 'user',
};
