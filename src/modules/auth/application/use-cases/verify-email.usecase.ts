import AppError from '@shared/errors/base/AppError';

import { UserRepository } from '@modules/user/domain/user.repository.interface';

import { ITokenProvider } from '@shared/security/interfaces/token-provider.interface';
import { UserNotFoundError } from '@shared/errors';

interface VerifyEmailPayload {
  userId: string;
  email: string;
}

export interface VerifyEmailDto {
  token: string;
}

export class VerifyEmailUseCase {
  constructor(
    private readonly userRepo: UserRepository,

    private readonly tokenProvider: ITokenProvider
  ) {}

  async execute(dto: VerifyEmailDto): Promise<void> {
    const decoded = this.tokenProvider.verifyAccessToken<VerifyEmailPayload>(dto.token);

    const user = await this.userRepo.findById(decoded.userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    if (user.toResponse().isAccountVerified) {
      return;
    }

    user.verifyAccount();

    await this.userRepo.save(user);
  }
}
