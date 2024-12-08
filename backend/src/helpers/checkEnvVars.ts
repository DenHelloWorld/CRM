import { InternalServerErrorException } from '@nestjs/common';
import 'dotenv/config';

const checkEnvVars = (envVar: string) => {
  if (!process.env[envVar]) {
    throw new InternalServerErrorException(
      `JWT configuration is missing for ${envVar} in environment variables`,
    );
  }
};
export default checkEnvVars;
