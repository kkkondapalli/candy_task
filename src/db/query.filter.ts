import { Query } from '@nestjs/common';
import { PAGINATION_LENGTH } from "../support/constants";
import OrderQuery, { SortDirection } from './query/order.query';
import PaginationQuery from './query/pagination.query';

export type QueryFilter = PaginationQuery & OrderQuery & typeof Query;

export default class QueryHelper {
  static filter(query: QueryFilter) {
    const take = Number(query.limit) || PAGINATION_LENGTH;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * take;

    return {
      take,
      skip,
      sort_direction: query.sort_direction ?? SortDirection.DESC,
      sort_by: query.sort_by ?? 'id',
    };
  }
}
