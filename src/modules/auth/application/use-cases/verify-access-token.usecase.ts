import AppError from '@shared/errors/base/AppError';
import { UserRepository } from '@modules/user/domain/user.repository.interface';
import { ITokenProvider, TokenPayload } from '@shared/security/interfaces/token-provider.interface';
import { VerifyAccessTokenDto } from '../dto/verify-access-token.dto';
import { ForbiddenError, UnauthorizedError } from '@shared/errors';

export class VerifyAccessTokenUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly tokenProvider: ITokenProvider
  ) {}

  async execute(dto: VerifyAccessTokenDto) {
    const decoded = this.tokenProvider.verifyAccessToken<TokenPayload>(dto.accessToken);

    const user = await this.userRepo.findById(decoded.userId);

    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    if (user.isBlocked) {
      throw new ForbiddenError('User account has been blocked');
    }

    return user.toResponse();
  }
}
