import config from '@shared/config/env.const';

import { MongoUserRepository } from '@modules/user/infrastructure/persistence/user.repository';
import { BcryptPasswordHasher } from '@shared/security/bcrypt-password-hasher';
/**
 * controller
 */

import { LoginAuthUseCase } from '@modules/auth/application/use-cases/login-auth.usecase';
import { RegisterAuthUseCase } from '@modules/auth/application/use-cases/register-auth.usecase';
import { ChangePasswordUseCase } from '@modules/auth/application/use-cases/change-password.usecase';
import { ForgotPasswordUseCase } from '@modules/auth/application/use-cases/forgot-password.usecase';
import { ResetPasswordUseCase } from '@modules/auth/application/use-cases/reset-password.usecase';
import { RefreshTokenUseCase } from '@modules/auth/application/use-cases/refresh-token.usecase';
import { VerifyEmailUseCase } from '@modules/auth/application/use-cases/verify-email.usecase';
import { ResendVerificationUseCase } from '@modules/auth/application/use-cases/resend-verification.usecase';
import { LogoutAuthUseCase } from '@modules/auth/application/use-cases/logout-auth.usecase';
import { VerifyAccessTokenUseCase } from '@modules/auth/application/use-cases/verify-access-token.usecase';
import { AuthenticationService } from '@modules/auth/application/services/authentication.service';

import { userRepo } from '@infra/providers/auth.provider';
import { UserController } from './user-controller.class';
import { FetchAnUserUseCase } from '@modules/user/application/use-cases/fetch-user.usecase';

/**
 * repository
 */

const fetchAnUserUseCase = new FetchAnUserUseCase(userRepo);

export const userController = new UserController(fetchAnUserUseCase);
