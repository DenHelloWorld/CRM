import { SetMetadata } from '@nestjs/common';
import 'dotenv/config';

export const PUBLIC_KEY = process.env.PUBLIC_KEY;
export const REFRESH_KEY = process.env.REFRESH_KEY;
export const Public = () => SetMetadata(PUBLIC_KEY, true);
export const Refresh = () => SetMetadata(REFRESH_KEY, true);
