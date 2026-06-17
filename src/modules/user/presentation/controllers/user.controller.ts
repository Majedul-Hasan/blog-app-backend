import { parseGetUsersDTO } from '@modules/user/application/dto/get-users.dto';

import { UserUseCase } from '@modules/user/application/use-cases/user.usecase';
import { MongoUserRepository } from '@modules/user/infrastructure/persistence/user.repository';
import { BcryptPasswordHasher } from '@shared/security/bcrypt-password-hasher';

import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

/*
export const fetchUsersCtrl = asyncHandler(async (req: Request, res: Response) => {
    const useCase = new UserUseCase(
        new MongoUserRepository(),
    );

    const user = await useCase.getAllUsers();

    const resp = user.map((user: any) => user.props)
    res.status(200).json(resp);
});
*/

export const getUsersCtrl = asyncHandler(async (req, res) => {
  const dto = parseGetUsersDTO(req.query);

  const useCase = new UserUseCase(new MongoUserRepository());

  const result = await useCase.getUsers(dto);
  const resp = result.data.map((user: any) => {
    delete user.props.password;

    return user.props;
  });

  res.json({
    meta: {
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: Math.ceil(result.total / result.limit),
    },
    data: resp,
  });
});
