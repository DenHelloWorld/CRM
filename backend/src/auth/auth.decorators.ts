import { SetMetadata } from '@nestjs/common';
import 'dotenv/config';

export const PUBLIC_KEY = process.env.PUBLIC_KEY;

export const Public = () => SetMetadata(PUBLIC_KEY, true);
