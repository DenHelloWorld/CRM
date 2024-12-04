import { endpoints } from "../app/app.models";
import { Environment } from "./environment.model";

export const environment: Environment = {
  production: true,
  apiUrl: 'http://localhost:3001',
  endpoints: endpoints,
};
