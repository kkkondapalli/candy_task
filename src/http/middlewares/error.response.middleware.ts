import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from "express";
import ErrorResponseInterface from '../interface/error.response.interface';

@Injectable()
export default class ErrorResponseMiddleware implements NestMiddleware {
  use(req: Request, res: ErrorResponseInterface, next: NextFunction) {
    // add error response helper
    res.errorResponse = (
      err: any,
      code = 500,
      message = 'Something went wrong',
    ) => {
      res.statusCode = err.status || code;
      message = err.message || message;
      const responseObject = {
        success: false,
        message,
      };

      return res.json(responseObject);
    };

    // custom 422 validation error if we want to push errors.
    res.validationError = (message: string, key: string, type: string) => {
      res.statusCode = 422;
      const bodyKeys = Object.keys(req.body);
      const body =
        bodyKeys.length > 0 && bodyKeys[0] !== '' ? req.body : { [key]: '' };
      const errors = {
        original: body,
        details: [
          {
            key,
            message,
            type,
          },
        ],
      };

      return res.json({
        success: false,
        message: 'Invalid Data',
        errors,
      });
    };

    next();
  }
}
