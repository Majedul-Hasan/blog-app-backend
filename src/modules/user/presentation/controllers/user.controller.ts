import { tokenProvider } from '@infra/providers/auth.provider';
import { parseGetUsersDTO } from '@modules/user/application/dto/get-users.dto';
import { parseLoginUserDTO } from '@modules/user/application/dto/login-user.dto';
import { parseRegisterUserDTO } from '@modules/user/application/dto/register-user.dto';
import { LoginUserUseCase } from '@modules/user/application/use-cases/login-user.usecase';
import { RegisterUserUseCase } from '@modules/user/application/use-cases/register-user.usecase';
import { UserUseCase } from '@modules/user/application/use-cases/user.usecase';
import { MongoUserRepository } from '@modules/user/infrastructure/persistence/user.repository';
import { BcryptPasswordHasher } from '@shared/security/bcrypt-password-hasher';

import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

export const userRegisterCtrl = asyncHandler(async (req: Request, res: Response) => {
  const dto = parseRegisterUserDTO(req.body);

  const useCase = new RegisterUserUseCase(new MongoUserRepository(), new BcryptPasswordHasher());

  const user = await useCase.execute(dto);

  // IMPORTANT: don’t return passwordHash
  res.status(201).json(user.toResponse());
});

export const loginUserCtrl = asyncHandler(async (req: Request, res: Response) => {
  const dto = parseLoginUserDTO(req.body);

  const useCase = new LoginUserUseCase(new MongoUserRepository(), new BcryptPasswordHasher(), tokenProvider);

  const user = await useCase.execute(dto);

  res.status(200).json({
    id: user.user.id,
    firstName: user.user.firstName,
    lastName: user.user.lastName,
    email: user.user.email,
    role: user.user.role,
    accessToken: user.accessToken,
    refreshToken: user.refreshToken,
  });
});

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
export const fetchUserByIdCtrl = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params['id'];
  const useCase = new UserUseCase(new MongoUserRepository());

  const user = await useCase.getUserById(id as string);

  res.status(200).json(user);
});
