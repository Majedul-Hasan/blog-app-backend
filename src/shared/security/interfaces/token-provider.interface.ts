
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
    generate<T extends object>(
        payload: T,
        options?: GenerateTokenOptions
    ): string;

    verify<T extends object>(token: string): T;
}



