// infrastructure/container/auth.container.ts

import { NodemailerEmailProvider } from '@infra/email/nodemailer/nodemailer-email.provider';

import { AuthenticationService } from '@modules/auth/application/services/authentication.service';
import { MongoUserRepository } from '@modules/user/infrastructure/persistence/user.repository';
import config from '@shared/config/env.const';
import { JwtTokenProvider } from '@shared/security/interfaces/jwt.provider';

/**
 * providers
 */

export const userRepo = new MongoUserRepository();
export const tokenProvider = new JwtTokenProvider(config.jwt.jwt_secret, config.jwt.jwt_refresh_secret);

export const emailProvider = new NodemailerEmailProvider();

/**
 * Service
 */

export const authenticationService = new AuthenticationService(userRepo, tokenProvider);
