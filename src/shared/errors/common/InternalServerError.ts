import status from 'http-status';
import AppError from '../base/AppError';

export class InternalServerError extends AppError {
  constructor(message = 'Bad request') {
    super(status.INTERNAL_SERVER_ERROR, message);
  }
}
