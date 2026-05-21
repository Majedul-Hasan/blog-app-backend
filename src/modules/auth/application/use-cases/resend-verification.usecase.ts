import config from '@shared/config/env.const';

import { UserRepository } from '@modules/user/domain/user.repository.interface';
import { ITokenProvider } from '@shared/security/interfaces/token-provider.interface';
import { EmailProvider } from '@shared/email/email-provider.interface';
import { verifyEmailTemplate } from '@shared/email/templates/verify-email.template';
import { ResendVerificationDto } from '../dto/resend-verification.dto';


export class ResendVerificationUseCase {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly tokenProvider: ITokenProvider,
        private readonly emailProvider: EmailProvider
    ) { }

    async execute(dto: ResendVerificationDto): Promise<void> {
        const user = await this.userRepo.findByEmail(dto.email);

        if (!user) {
            return;
            /**
             * @Security_note : do not reveal account existence
             */
        }

        if (user.toResponse().isAccountVerified) {
            return;
        }

        const verificationToken = this.tokenProvider.generate(
            {
                userId: user.id,
                email: user.email,
            },
            {
                expiresIn: config.jwt.secret_expires_in,
            }
        );

        const verificationUrl = `${config.client_url}/verify-email?token=${verificationToken}`;

        await this.emailProvider.send({
            to: user.email,
            subject: 'Verify Your Email',
            html: verifyEmailTemplate(verificationUrl),
        });
    }
}
