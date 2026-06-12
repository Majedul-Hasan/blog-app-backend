// src/modules/auth/application/use-cases/reset-password.usecase.ts

import AppError from '@shared/errors/base/AppError';

import { UserRepository } from '@modules/user/domain/user.repository.interface';

import { PasswordHasher } from '@shared/security/password-hasher.interface';

import { ITokenProvider } from '@shared/security/interfaces/token-provider.interface';
import { UserNotFoundError } from '@shared/errors';
import { ResetPasswordAuthDto } from '../dto/reset-password.dto';

interface ResetPasswordPayload {
  userId: string;
  email: string;
}

export class ResetPasswordUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly hasher: PasswordHasher,
    private readonly tokenProvider: ITokenProvider
  ) {}

  async execute(dto: ResetPasswordAuthDto): Promise<void> {
    const decoded = this.tokenProvider.verifyAccessToken<ResetPasswordPayload>(dto.token);

    const user = await this.userRepo.findById(decoded.userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const hashedPassword = await this.hasher.hash(dto.newPassword);

    console.log(36, hashedPassword);
    user.changePassword(hashedPassword);

    await this.userRepo.update(user.id, user);
  }
}
