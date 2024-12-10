import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
const logger = new Logger('CONSTANTS');

const logConfigValue = (key: string, value: any) => {
  if (value) {
    logger.log(`Loaded config: ${key}`);
  } else {
    logger.warn(`Config value for ${key} is undefined or null`);
  }
};

const CONSTANTS = {
  apiPort: configService.get<string>('API_PORT'),
  frontendPort: configService.get<string>('FRONTEND_PORT'),
  jwtSecret: configService.get<string>('JWT_SECRET_KEY'),
  jwtRefreshSecret: configService.get<string>('JWT_SECRET_REFRESH_KEY'),
  dbUrl: configService.get<string>('DATABASE_URL'),
  tokenExpireTime: configService.get<string>('TOKEN_EXPIRE_TIME'),
  tokenRefreshExpireTime: configService.get<string>(
    'TOKEN_REFRESH_EXPIRE_TIME',
  ),
  publicKey: configService.get<string>('PUBLIC_KEY'),
  refreshKey: configService.get<string>('REFRESH_KEY'),
  cryptSalt: configService.get<number>('CRYPT_SALT'),
  withoutPasswordToken: {
    id: true,
    email: true,
    name: true,
    createdAt: true,
    updatedAt: true,
    role: true,
    tasks: {
      select: {
        id: true,
        title: true,
        status: true,
        description: true,
      },
    },
    password: false,
    refreshToken: false,
  },
};

for (const [key, value] of Object.entries(CONSTANTS)) {
  logConfigValue(key, value);
}

export default CONSTANTS;
