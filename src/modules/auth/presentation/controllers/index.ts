import config from '@shared/config/env.const';

import { MongoUserRepository } from '@modules/user/infrastructure/persistence/user.repository';
import { BcryptPasswordHasher } from '@shared/security/bcrypt-password-hasher';

// import { JwtTokenProvider } from '@shared/security/jwt/jwt.provider';

// import { SendGridEmailProvider } from '@infrastructure/email/sendgrid/sendgrid-email.provider';

/**
 * use-cases
 */

// import { LoginAuthUseCase } from './application/use-cases/login-auth.usecase';

// import { RegisterAuthUseCase } from './application/use-cases/register-auth.usecase';

// import { ChangePasswordUseCase } from './application/use-cases/change-password.usecase';

// import { ForgotPasswordUseCase } from './application/use-cases/forgot-password.usecase';

// import { ResetPasswordUseCase } from './application/use-cases/reset-password.usecase';

// import { RefreshTokenUseCase } from './application/use-cases/refresh-token.usecase';

// import { VerifyEmailUseCase } from './application/use-cases/verify-email.usecase';

// import { ResendVerificationUseCase } from './application/use-cases/resend-verification.usecase';

// import { LogoutAuthUseCase } from './application/use-cases/logout-auth.usecase';

// import { VerifyAccessTokenUseCase } from './application/use-cases/verify-access-token.usecase';

/**
 * controller
 */

import { AuthController } from './auth-controller.class';
import { JwtTokenProvider } from '@infra/security/jwt/jwt.provider';
import { SendGridEmailProvider } from '@infra/email/sendgrid/sendgrid-email.provider';
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


/**
 * repository
 */

const userRepo = new MongoUserRepository();

/**
 * providers
 */

const hasher = new BcryptPasswordHasher();

const accessTokenProvider = new JwtTokenProvider(config.jwt.jwt_secret);

const refreshTokenProvider = new JwtTokenProvider(config.jwt.jwt_refresh_secret);

const emailProvider = new SendGridEmailProvider();

/**
 * use-cases
 */

const loginUseCase = new LoginAuthUseCase(userRepo, hasher, accessTokenProvider);

const registerUseCase = new RegisterAuthUseCase(userRepo, hasher, accessTokenProvider);

const changePasswordUseCase = new ChangePasswordUseCase(userRepo, hasher);

const forgotPasswordUseCase = new ForgotPasswordUseCase(userRepo, accessTokenProvider, emailProvider);

const resetPasswordUseCase = new ResetPasswordUseCase(userRepo, hasher, accessTokenProvider);

const refreshTokenUseCase = new RefreshTokenUseCase(userRepo, accessTokenProvider, refreshTokenProvider);

const verifyEmailUseCase = new VerifyEmailUseCase(userRepo, accessTokenProvider);

const resendVerificationUseCase = new ResendVerificationUseCase(userRepo, accessTokenProvider, emailProvider);

const logoutUseCase = new LogoutAuthUseCase();

const verifyAccessTokenUseCase = new VerifyAccessTokenUseCase(userRepo, accessTokenProvider);

/**
 * controller
 */

export const authenticationService =
    new AuthenticationService(
        userRepo,
        accessTokenProvider
    );

export const authController = new AuthController(
    loginUseCase,
    registerUseCase,
    changePasswordUseCase,
    forgotPasswordUseCase,
    resetPasswordUseCase,
    refreshTokenUseCase,
    verifyEmailUseCase,
    resendVerificationUseCase,
    logoutUseCase,
    verifyAccessTokenUseCase
);
