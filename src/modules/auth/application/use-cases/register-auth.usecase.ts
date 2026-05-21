import { ITokenProvider } from "@shared/security/interfaces/token-provider.interface";
import { PasswordHasher } from "@shared/security/password-hasher.interface";
import { RegisterAuthDTO } from "../dto/register-auth.dto";

import { AuthResponseDto } from "../dto/auth-response.dto";
import config from "@shared/config/env.const";

import { UserRepository } from "@modules/user/domain/user.repository.interface";
import { UserEntity } from "@modules/user/domain/user.entity";
import { UserExistsError } from "@shared/errors/user/UserExistsError";
import { UserRole } from "@modules/user/domain/types/userRole.types";
export class RegisterAuthUseCase {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly hasher: PasswordHasher,
        private readonly tokenProvider: ITokenProvider

    ) { }

    async execute(dto: RegisterAuthDTO): Promise<AuthResponseDto> {
        const existing = await this.userRepo.findByEmail(dto.email);
        console.log({ existing })

        if (existing) throw new UserExistsError();

        const hashedPassword = await this.hasher.hash(dto.password);
        const user = UserEntity.create({
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email,
            password: hashedPassword,
            role: UserRole.GUEST,
        });
        const savedUser = await this.userRepo.save(user);

        const payload = {
            userId: savedUser.id!,
            email: savedUser.email,
            role: savedUser.role,
        };

        const accessToken =
            this.tokenProvider.generate(
                payload,
                {
                    expiresIn: config.jwt.access_expires_in,
                }
            );

        const refreshToken =
            this.tokenProvider.generate(
                payload,
                {
                    expiresIn: config.jwt.refresh_expires_in,
                }
            );

        return {
            // user: {
            //     id: savedUser.id!,
            //     firstName: savedUser.firstName,
            //     lastName: savedUser.lastName,
            //     email: savedUser.email,
            //     role: savedUser.role,
            // },
            user: user.toResponse(),
            tokens: {
                accessToken,
                refreshToken,
            },
        };


    }
}