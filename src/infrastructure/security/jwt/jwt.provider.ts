import { InvalidTokenError, TokenExpiredError } from '@shared/errors';
import { ITokenProvider, GenerateTokenOptions } from '@shared/security/interfaces/token-provider.interface';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';

export class JwtTokenProvider implements ITokenProvider {
  constructor(private readonly secret: Secret) {}

  generate<T extends object>(payload: T, options?: GenerateTokenOptions): string {
    return jwt.sign(payload, this.secret, {
      algorithm: 'HS256',
      expiresIn: options?.expiresIn as SignOptions['expiresIn'],
    });
  }

  verify<T extends object>(token: string): T {
    try {
      const decoded = jwt.verify(token, this.secret);
      if (typeof decoded === 'string') {
        throw new InvalidTokenError('Invalid token payload');
      }

      return decoded as T;
    } catch (error) {
      throw new TokenExpiredError('Invalid or expired token');
    }
  }
}
