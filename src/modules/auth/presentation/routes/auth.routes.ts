import { Router } from 'express';
import { authController, authenticationService } from '../controllers';
import { authMiddleware } from '@infra/http/express/middlewares/auth.middleware';
import validateRequest from '@infra/http/express/middlewares/validateRequest';
import {
  loginAuthValidationSchema,
  RegisterAuthValidationSchema,
  forgotPasswordValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
  resendVerificationValidationSchema,
  resetPasswordValidationSchema,
  verifyAccessTokenValidationSchema,
  verifyEmailValidationSchema,
} from '../validators';

const router = Router();
router.post('/register', validateRequest(RegisterAuthValidationSchema), authController.register);

router.post('/login', validateRequest(loginAuthValidationSchema), authController.login);

router.post('/forgot-password', validateRequest(forgotPasswordValidationSchema), authController.forgotPassword);

router.post('/reset-password', validateRequest(resetPasswordValidationSchema), authController.resetPassword);

router.post('/refresh-token', validateRequest(refreshTokenValidationSchema), authController.refreshToken);

router.post('/verify-email', validateRequest(verifyEmailValidationSchema), authController.verifyEmail);

router.post(
  '/resend-verification',
  validateRequest(resendVerificationValidationSchema),
  authController.resendVerification
);

router.post(
  '/verify-access-token',
  validateRequest(verifyAccessTokenValidationSchema),
  authController.verifyAccessToken
);
/**
 * protected
 */
router.post(
  '/change-password',
  authMiddleware(authenticationService),
  validateRequest(changePasswordValidationSchema),
  authController.changePassword
);

router.post(
  '/logout',

  authMiddleware(authenticationService),
  authController.logout
);

export default router;
