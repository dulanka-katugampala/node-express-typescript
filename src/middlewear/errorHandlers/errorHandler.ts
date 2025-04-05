import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../core/errors/AppError';
import { envs } from '../../core/config/env';

interface ErrorResponse {
  ok: boolean;
  status: string;
  message: string;
  stack?: string;
  errors?: any;
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;

  const response: ErrorResponse = {
    ok: false,
    status: statusCode >= 500 ? 'error' : 'fail',
    message: err.message || 'Internal server error',
  };

  // Handle Sequelize validation errors
  if (err instanceof AppError && err.errors) {
    response.errors = err.errors?.map((e: any) => {
      return {
        field: e.path,
        message: e.msg,
      }
    });
  }

  // Only add stack trace in development
  if (envs.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};