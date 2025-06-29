import { BaseError, logger } from '@huseynovvusal/url-shortener-shared';
import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';

export const errorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error(error.message);

  if (error instanceof ZodError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: 'error',
      message: 'Validation error',
      errors: error.errors,
    });
  }

  if (error instanceof BaseError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'Internal server error',
  });
};
