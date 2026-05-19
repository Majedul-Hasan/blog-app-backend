export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public errorDetails?: unknown;

  constructor(
    statusCode = 500,
    message: string,
    errorDetails?: unknown,
    isOperational = true
  ) {
    super(message);

    this.statusCode = statusCode;
    this.errorDetails = errorDetails;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;