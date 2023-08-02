import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { PAGINATION_LENGTH } from '../../support/constants';
import SuccessResponseInterface from '../interface/success.response.interface';

@Injectable()
export default class SuccessResponseMiddleware implements NestMiddleware {
  use(req: unknown, res: SuccessResponseInterface, next: NextFunction) {
    // success response helper.
    res.success = ({
      data,
      message,
      code = 200,
    }: {
      data?: any;
      message?: any;
      code?: number;
    }) => {
      res.statusCode = code;
      const responseObject = {
        success: true,
        message: message,
        data,
      };

      if (!message) {
        delete responseObject.message;
      }

      if (!data) {
        delete responseObject.data;
      }

      return res.json(responseObject);
    };

    // pagination helper
    res.pagination = (
      data: any,
      count: number,
      query: any,
      message = 'Data fetched successfully',
      next_page_created_time?: string,
    ) => {
      res.statusCode = 200;
      const page = query.page ? parseInt(query.page) : 1;
      const limit = query.limit ? parseInt(query.limit) : PAGINATION_LENGTH;

      const has_more_records =
        page && limit ? (page - 1) * limit + data.length < count : false;
      let total_pages = 0;
      if (count) {
        total_pages = Math.ceil((count - 1) / limit);
      }

      return res.json({
        success: true,
        message: data.length ? message : 'No records.',
        meta: {
          has_more_records,
          current_page: page,
          limit,
          total: count,
          total_pages,
          next_page: has_more_records ? page + 1 : null,
          prev_page: page === 1 ? null : page - 1,
          next_page_created_time,
        },
        data,
      });
    };

    next();
  }
}
