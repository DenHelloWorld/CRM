import { SetMetadata } from '@nestjs/common';
import CONSTANTS from '../constants';

export const Public = () => SetMetadata(CONSTANTS.publicKey, true);
