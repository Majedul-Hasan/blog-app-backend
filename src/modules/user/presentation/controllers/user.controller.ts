import { parseRegisterUserDTO } from "@modules/user/application/dto/register-user.dto";
import { RegisterUserUseCase } from "@modules/user/application/use-cases/register-user.usecase";
import { MongoUserRepository } from "@modules/user/infrastructure/persistence/user.repository";
import { BcryptPasswordHasher } from "@shared/security/bcrypt-password-hasher";

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