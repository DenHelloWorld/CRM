import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../app.models';

@Injectable()
export class VersionMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    if (!req.url.startsWith('/v') && !req.version) {
      const errorResponse: ErrorResponse = {
        message: [
          'API version is missing or incorrect. Please specify a valid version.',
        ],
        error: 'Bad Request',
        statusCode: 400,
      };
      res.status(400).json(errorResponse);
    } else {
      next();
    }
  }
}
