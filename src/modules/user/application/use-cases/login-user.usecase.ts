import { UserRepository } from '@modules/user/domain/user.repository.interface';
import { UserEntity } from '@modules/user/domain/user.entity';
import { PasswordHasher } from '@shared/security/password-hasher.interface';
import { LoginUserDTO } from '../dto/login-user.dto';

import { InvalidCredentialsError } from '@shared/errors';
import { ITokenProvider } from '@shared/security/interfaces/token-provider.interface';

export class LoginUserUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly hasher: PasswordHasher,
    private readonly tokenService: ITokenProvider
  ) {}

  async execute(dto: LoginUserDTO) {
    const user = await this.userRepo.findByEmail(dto.email);
    if (!user) throw new InvalidCredentialsError('Invalid email or password');
    console.log(user);

    const isMatch = await this.hasher.compare(dto.password, user.password);

    if (!isMatch) throw new InvalidCredentialsError('Invalid email or password');

    const payload = {
      userId: user.id!,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.tokenService.generateAccessToken(payload);
    const refreshToken = this.tokenService.generateRefreshToken(payload);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }
}
