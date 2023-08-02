import { Response } from "express";

export default interface SuccessResponseInterface extends Response {
  success({
    data,
    message,
    code,
  }: {
    data?: any;
    message?: any;
    code?: number;
  });

  pagination(data: any, count: number, query: any, message: string);
}
