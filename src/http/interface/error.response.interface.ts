import { Response } from 'express';

export default interface ErrorResponseInterface extends Response {
  validationError(message: string, key: string, type: string);

  errorResponse(err: any, code?: number, message?: string);
}
