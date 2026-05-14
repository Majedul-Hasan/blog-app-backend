import { parseLoginUserDTO } from "@modules/user/application/dto/login-user.dto";
import { parseRegisterUserDTO } from "@modules/user/application/dto/register-user.dto";
import { LoginUserUseCase } from "@modules/user/application/use-cases/login-user.usecase";
import { RegisterUserUseCase } from "@modules/user/application/use-cases/register-user.usecase";
import { MongoUserRepository } from "@modules/user/infrastructure/persistence/user.repository";
import { BcryptPasswordHasher } from "@shared/security/bcrypt-password-hasher";
import { TokenService } from "@shared/security/token.service";

import { Request, Response } from "express";
import asyncHandler from "express-async-handler";


export const userRegisterCtrl = asyncHandler(async (req: Request, res: Response) => {
    const dto = parseRegisterUserDTO(req.body);

    const useCase = new RegisterUserUseCase(
        new MongoUserRepository(),
        new BcryptPasswordHasher()
    );

    const user = await useCase.execute(dto);

    // IMPORTANT: don’t return passwordHash
    res.status(201).json(user.toResponse());
});

export const loginUserCtrl = asyncHandler(async (req: Request, res: Response) => {
    const dto = parseLoginUserDTO(req.body);

    const useCase = new LoginUserUseCase(
        new MongoUserRepository(),
        new BcryptPasswordHasher(),
        new TokenService(),

    );

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