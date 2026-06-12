export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export interface GenerateTokenOptions {
  expiresIn?: string | number;
  //   expiresIn?: SignOptions["expiresIn"];
}

export interface ITokenProvider {
  generateAccessToken<T extends object>(payload: T, options?: GenerateTokenOptions): string;
  generateRefreshToken<T extends object>(payload: T, options?: GenerateTokenOptions): string;

  verifyAccessToken<T extends object>(token: string): T;
  verifyRefreshToken<T extends object>(token: string): T;
}
