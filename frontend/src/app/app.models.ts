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

export interface Endpoints {
  protected: { users: string };
  login: string;
  register: string;
  refresh: string;
}

export const endpoints: Endpoints = {
  protected: { users: 'users' },
  login: 'auth/login',
  register: 'auth/register',
  refresh: 'auth/refresh',
};
