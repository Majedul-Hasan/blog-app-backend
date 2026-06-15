import { Request, Response } from 'express';
import status from 'http-status';
import catchAsync from '@infra/http/express/utils/catch-async';
import sendResponse from '@infra/http/express/utils/sendResponse';

import { FetchAnUserUseCase } from '@modules/user/application/use-cases/fetch-user.usecase';
import AppError from '@shared/errors/base/AppError';

export class UserController {
  constructor(private readonly fetchAnUserUseCase: FetchAnUserUseCase) {}

  userById = catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.userId;
    if (!userId || Array.isArray(userId)) {
      throw new AppError(400, 'Invalid ID format');
    }
    const result = await this.fetchAnUserUseCase.execute({ userId });

    sendResponse(res, {
      statusCode: status.OK,
      message: 'User fetched successfully',
      data: result,
    });
  });
}
