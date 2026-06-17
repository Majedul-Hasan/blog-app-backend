import { Request, Response } from 'express';
import status from 'http-status';
import catchAsync from '@infra/http/express/utils/catch-async';
import sendResponse from '@infra/http/express/utils/sendResponse';

import { FetchAnUserUseCase } from '@modules/user/application/use-cases/fetch-user.usecase';
import AppError from '@shared/errors/base/AppError';
import { FetchUsersUseCase } from '@modules/user/application/use-cases/fetch-users.usecase';

export class UserController {
  constructor(
    private readonly fetchAnUserUseCase: FetchAnUserUseCase,
    private readonly fetchUsersUseCase: FetchUsersUseCase
  ) {}

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
  users = catchAsync(async (req: Request, res: Response) => {
    // const {
    //   page = 0,
    //   limit = 25,
    //   search,
    //   role,
    //   isBlocked,
    // }: {
    //   page?: number;
    //   limit?: number;
    //   search?: string;
    //   role?: 'Admin' | 'Guest' | 'Blogger';
    //   isBlocked?: boolean;
    // } = req.query;
    const { page, limit, search, role, isBlocked } = req.query as {
      page: string;
      limit: string;
      search?: string;
      role?: 'Admin' | 'Guest' | 'Blogger';
      isBlocked?: string;
    };

    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 25;

    const blocked = isBlocked !== undefined ? isBlocked === 'true' : undefined;

    const result = await this.fetchUsersUseCase.execute({
      page: pageNumber,
      limit: limitNumber,
      search,
      role,
      isBlocked: blocked,
    });

    sendResponse(res, {
      statusCode: status.OK,
      message: 'User fetched successfully',
      data: result,
    });
  });
}
