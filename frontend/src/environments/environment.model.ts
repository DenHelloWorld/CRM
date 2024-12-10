import { Endpoints } from '../app/app.models';

export interface Environment {
  production: boolean;
  tokensKey: string;
  apiUrl: string;
  endpoints: Endpoints;
}
