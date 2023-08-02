import { Response } from 'express';
import ErrorResponseInterface from './interface/error.response.interface';
import SuccessResponseInterface from './interface/success.response.interface';

export type ApiResponse = SuccessResponseInterface &
  ErrorResponseInterface &
  Response;
