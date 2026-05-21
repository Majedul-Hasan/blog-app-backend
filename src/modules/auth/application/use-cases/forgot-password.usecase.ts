

import config from "@shared/config/env.const";

import AppError from "@shared/errors/base/AppError";

import { UserRepository }
    from "@modules/user/domain/user.repository.interface";

import { ITokenProvider }
    from "@shared/security/interfaces/token-provider.interface";
import { EmailProvider } from "@shared/email/email-provider.interface";
import { ForgotPasswordAuthDto } from "../dto/forgot-password.dto";



export class ForgotPasswordUseCase {

    constructor(
        private readonly userRepo: UserRepository,
        private readonly tokenProvider: ITokenProvider,
        private readonly emailProvider: EmailProvider
    ) { }

    async execute(
        dto: ForgotPasswordAuthDto
    ): Promise<void> {

        const user =
            await this.userRepo.findByEmail(
                dto.email
            );

        /**
         * Important security practice:
         * never reveal whether email exists
         */

        if (!user) {
            return;
        }

        const resetToken =
            this.tokenProvider.generate(
                {
                    userId: user.id,
                    email: user.email,
                },
                {
                    expiresIn: config.jwt.secret_expires_in,
                }
            );

        const resetUrl =
            `${config.client_url}/reset-password?token=${resetToken}`;

        await this.emailProvider.send({
            to: user.email,

            subject: "Reset Your Password",

            html: `
                <h2>Password Reset</h2>

                <p>
                    Click the link below
                    to reset your password:
                </p>

                <a href="${resetUrl}">
                    Reset Password
                </a>

                <p>
                    This link expires in 15 minutes.
                </p>
            `,
        });
    }
}