import { Request, Response } from 'express';
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
import catchAsync from '@infra/http/express/utils/catch-async';
import sendResponse from '@infra/http/express/utils/sendResponse';
import status from 'http-status';

export class AuthController {
  constructor(
    private readonly loginUseCase: LoginAuthUseCase,
    private readonly registerUseCase: RegisterAuthUseCase,
    private readonly changePasswordUseCase: ChangePasswordUseCase,
    private readonly forgotPasswordUseCase: ForgotPasswordUseCase,
    private readonly resetPasswordUseCase: ResetPasswordUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly verifyEmailUseCase: VerifyEmailUseCase,
    private readonly resendVerificationUseCase: ResendVerificationUseCase,
    private readonly logoutUseCase: LogoutAuthUseCase,
    private readonly verifyAccessTokenUseCase: VerifyAccessTokenUseCase
  ) {}

  login = catchAsync(async (req: Request, res: Response) => {
    const result = await this.loginUseCase.execute(req.body);

    sendResponse(res, {
      statusCode: status.OK,
      message: 'Login successful',
      data: result,
    });
  });

  register = catchAsync(async (req: Request, res: Response) => {
    const result = await this.registerUseCase.execute(req.body);
    sendResponse(res, {
      statusCode: status.CREATED,
      message: 'Registration successful',
      data: result,
    });

    // res.status(201).json({
    //   success: true,
    //   message: 'Registration successful',
    //   data: result,
    // });
  });

  changePassword = catchAsync(async (req: Request, res: Response) => {
    const userId = req.user?._id;
    await this.changePasswordUseCase.execute({
      userId,
      ...req.body,
    });

    sendResponse(res, {
      statusCode: status.OK,
      message: 'Password changed successfully',
    });
  });

  forgotPassword = catchAsync(async (req: Request, res: Response) => {
    await this.forgotPasswordUseCase.execute(req.body);
    sendResponse(res, {
      statusCode: status.OK,
      message: 'If account exists, password reset email sent',
    });
  });

  resetPassword = catchAsync(async (req: Request, res: Response) => {
    await this.resetPasswordUseCase.execute(req.body);
    sendResponse(res, {
      statusCode: status.OK,
      message: 'Password changed successfully',
    });
  });

  refreshToken = catchAsync(async (req: Request, res: Response) => {
    const result = await this.refreshTokenUseCase.execute(req.body);
    sendResponse(res, {
      statusCode: status.OK,
      message: 'Token refreshed',
      data: result,
    });
  });

  verifyEmail = catchAsync(async (req: Request, res: Response) => {
    await this.verifyEmailUseCase.execute(req.body);

    sendResponse(res, {
      statusCode: status.OK,
      message: 'Email verified successfully',
    });
  });

  resendVerification = catchAsync(async (req: Request, res: Response) => {
    await this.resendVerificationUseCase.execute(req.body);
    sendResponse(res, {
      statusCode: status.OK,
      message: 'Verification email sent if account exists',
    });
  });

  logout = catchAsync(async (req: Request, res: Response) => {
    await this.logoutUseCase.execute();
    sendResponse(res, {
      statusCode: status.OK,
      message: 'Logout successful',
    });
  });

  verifyAccessToken = catchAsync(async (req: Request, res: Response) => {
    const result = await this.verifyAccessTokenUseCase.execute(req.body);
    sendResponse(res, {
      statusCode: status.OK,
      message: 'Token valid',
      data: result,
    });
  });
}
