import config from '@shared/config/env.const';

import AppError from '@shared/errors/base/AppError';

import { UserRepository } from '@modules/user/domain/user.repository.interface';

import { ITokenProvider } from '@shared/security/interfaces/token-provider.interface';

import { AuthResponseDto } from '../dto/auth-response.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { UnauthorizedError, UserNotFoundError } from '@shared/errors';

interface RefreshTokenPayload {
  userId: string;
  email: string;
  role: string;
}

export class RefreshTokenUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly tokenProvider: ITokenProvider
  ) {}

  async execute(dto: RefreshTokenDto): Promise<AuthResponseDto> {
    if (!dto.refreshToken) {
      throw new UnauthorizedError('Refresh token is required');
    }

    const decoded = this.tokenProvider.verifyRefreshToken<RefreshTokenPayload>(dto.refreshToken);
    const user = await this.userRepo.findById(decoded.userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const payload = {
      userId: user.id!,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.tokenProvider.generateAccessToken(payload, {
      expiresIn: config.jwt.access_expires_in,
    });

    const refreshToken = this.tokenProvider.generateRefreshToken(payload, {
      expiresIn: config.jwt.refresh_expires_in,
    });

    return {
      user: user.toResponse(),
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }
}
