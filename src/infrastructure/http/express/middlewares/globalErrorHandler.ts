import logger from '@infra/logging/logger';
import config from '@shared/config/env.const';
import normalizeError from '@shared/errors/base/normalizeError';
import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const error = normalizeError(err);
  // Logging Strategy
  if (!error.isOperational) {
    logger.error(err); // Full raw error logged
  } else {
    logger.warn(error.message);
  }
  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    errorDetails: error.errorDetails || null,
    stack: config.env !== 'production' ? err.stack : undefined,
  });
};

export default globalErrorHandler;
