import config from '@shared/config/env.const';
import { InvalidCredentialsError } from '@shared/errors';

import { UserRepository } from '@modules/user/domain/user.repository.interface';

import { PasswordHasher } from '@shared/security/password-hasher.interface';

import { ITokenProvider } from '@shared/security/interfaces/token-provider.interface';

import { LoginAuthDto } from '../dto/login-auth.dto';

import { AuthResponseDto } from '../dto/auth-response.dto';

export class LoginAuthUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly hasher: PasswordHasher,
    private readonly tokenProvider: ITokenProvider
  ) {}

  async execute(dto: LoginAuthDto): Promise<AuthResponseDto> {
    const user = await this.userRepo.findByEmail(dto.email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isMatch = await this.hasher.compare(dto.password, user.password);

    if (!isMatch) {
      throw new InvalidCredentialsError();
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
      // expiresIn: config.jwt.refresh_expires_in,
      expiresIn: '7d',
    });

    return {
      // user: {
      //     id: user.id!,
      //     firstName: user.firstName,
      //     lastName: user.lastName,
      //     email: user.email,
      //     role: user.role,
      // },
      user: user.toResponse(),

      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }
}
