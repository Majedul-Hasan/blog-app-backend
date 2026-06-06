import { UnauthorizedError } from "@shared/errors";

type ExtractBearerTokenOptions = {
    statusCode?: number;
};

export const extractBearerToken = (
    authHeader?: string,
    options?: ExtractBearerTokenOptions
): string => {
    const statusCode = options?.statusCode ?? 401;

    if (!authHeader) {
        throw new UnauthorizedError("Authorization header is missing")

    }

    const [scheme, token] = authHeader.trim().split(" ");

    if (scheme !== "Bearer" || !token) {
        throw new UnauthorizedError("Invalid authorization format")

    }

    return token;
};