export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}
export default interface OrderQuery {
  sort_by?: string;
  sort_direction?: SortDirection;
}
