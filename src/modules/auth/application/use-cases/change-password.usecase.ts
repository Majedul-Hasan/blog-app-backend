
import AppError from "@shared/errors/base/AppError";

import { UserRepository } from "@modules/user/domain/user.repository.interface";

import { PasswordHasher } from "@shared/security/password-hasher.interface";
import { BadRequestError, InvalidCredentialsError, NotFoundError } from "@shared/errors";

export interface ChangePasswordDto {
    userId: string;
    currentPassword: string;
    newPassword: string;
}

export class ChangePasswordUseCase {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly hasher: PasswordHasher
    ) { }

    async execute(
        dto: ChangePasswordDto
    ): Promise<void> {

        let user =
            await this.userRepo.findById(
                dto.userId
            );

        if (!user) {
            throw new NotFoundError("User")
        }

        const isPasswordMatched =
            await this.hasher.compare(
                dto.currentPassword,
                user.password
            );

        if (!isPasswordMatched) {
            throw new InvalidCredentialsError("Current password is incorrect")
        }

        const isSamePassword =
            await this.hasher.compare(
                dto.newPassword,
                user.password
            );

        if (isSamePassword) {
            throw new BadRequestError("New password cannot be same as current password")
        }

        const hashedPassword =
            await this.hasher.hash(
                dto.newPassword
            );
        user.changePassword(hashedPassword);
        await this.userRepo.save(user);
    }
}