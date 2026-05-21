import AppError from "@shared/errors/base/AppError";

import { UserRepository }
    from "@modules/user/domain/user.repository.interface";

import { ITokenProvider, TokenPayload }
    from "@shared/security/interfaces/token-provider.interface";
import { UnauthorizedError, ForbiddenError } from "@shared/errors";

export class AuthenticationService {
    constructor(
        private readonly userRepo:
            UserRepository,
        private readonly tokenProvider:
            ITokenProvider
    ) { }

    async authenticate(
        accessToken: string
    ) {

        const decoded =
            this.tokenProvider.verify<
                TokenPayload
            >(accessToken);
        const user =
            await this.userRepo.findById(
                decoded.userId
            );

        if (!user) {
            throw new UnauthorizedError("User not found")
        }

        if (user.isBlocked) {
            throw new ForbiddenError("Account is blocked")
        }

        return user.toResponse();
    }
}