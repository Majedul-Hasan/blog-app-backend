import config from '@shared/config/env.const';

import { MongoUserRepository } from '@modules/user/infrastructure/persistence/user.repository';
import { BcryptPasswordHasher } from '@shared/security/bcrypt-password-hasher';
/**
 * controller
 */

import { AuthController } from './auth-controller.class';

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

import { tokenProvider, emailProvider, userRepo } from '@infra/providers/auth.provider';

/**
 * repository
 */

// const userRepo = new MongoUserRepository();

const hasher = new BcryptPasswordHasher();

const loginUseCase = new LoginAuthUseCase(userRepo, hasher, tokenProvider);
const registerUseCase = new RegisterAuthUseCase(userRepo, hasher, tokenProvider);
const changePasswordUseCase = new ChangePasswordUseCase(userRepo, hasher);
const forgotPasswordUseCase = new ForgotPasswordUseCase(userRepo, tokenProvider, emailProvider);
const resetPasswordUseCase = new ResetPasswordUseCase(userRepo, hasher, tokenProvider);
const refreshTokenUseCase = new RefreshTokenUseCase(userRepo, tokenProvider);
const verifyEmailUseCase = new VerifyEmailUseCase(userRepo, tokenProvider);
const resendVerificationUseCase = new ResendVerificationUseCase(userRepo, tokenProvider, emailProvider);
const logoutUseCase = new LogoutAuthUseCase();
const verifyAccessTokenUseCase = new VerifyAccessTokenUseCase(userRepo, tokenProvider);

/**
 * controller
 */

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
