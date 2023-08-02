import { Response } from 'express';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  CannotCreateEntityIdMapError,
  EntityNotFoundError,
  QueryFailedError,
} from 'typeorm';
import Utils from '../../support/utils';

@Catch()
export default class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let message = (exception as any).message || 'Something went wrong';
    let status: HttpStatus;
    let errors = [];

    console.log('*', exception, 'from http exception')
    switch (exception.constructor) {
      case UnprocessableEntityException:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = 'Invalid data';
        errors = exception['response'];
        break;
      case HttpException:
        status = (exception as HttpException).getStatus();
        break;
      case EntityNotFoundError:
        status = HttpStatus.BAD_REQUEST;
        message = 'No record found';
        break;
      case QueryFailedError:
      case CannotCreateEntityIdMapError:
        status = HttpStatus.BAD_REQUEST;
        message = (exception as QueryFailedError).message;
        switch ((exception as any).code) {
          case 'ER_DUP_ENTRY':
            const attribute = message.split(' ')[2];
            message = `Record with given ${attribute} already exists`;
            break;
        }
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    return response.status(status).json(
      Utils.removeEmptyItems({
        success: false,
        message,
        errors,
      }),
    );
  }
}
