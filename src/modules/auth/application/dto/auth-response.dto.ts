
export interface AuthTokensDto {
    accessToken: string;
    refreshToken: string;
}

export interface AuthUserDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

export interface AuthResponseDto {
    user: AuthUserDto;
    tokens: AuthTokensDto;
}