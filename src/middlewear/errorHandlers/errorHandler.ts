import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../core/classes/AppError';
import { HttpCode } from '../../core/constants';
import { ApiResponse } from '../../core/classes/ApiResponse';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  const statusCode = err instanceof AppError ? err.statusCode : HttpCode.INTERNAL_SERVER_ERROR;
  const errors = err instanceof AppError && err.errors ? err?.errors?.map((e: any) => {
    return {
      field: e.path,
      message: e.msg,
    }
  }) : [];

  const response: ApiResponse = err instanceof AppError ? ApiResponse.error(statusCode, err.message, errors) : ApiResponse.internalServerError(err.message);

  res.status(statusCode).json(response);
};