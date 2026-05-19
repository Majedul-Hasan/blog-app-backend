import AppError from "@shared/errors/base/AppError";

type ExtractBearerTokenOptions = {
    statusCode?: number;
};

export const extractBearerToken = (
    authHeader?: string,
    options?: ExtractBearerTokenOptions
): string => {
    const statusCode = options?.statusCode ?? 401;

    if (!authHeader) {
        throw new AppError(
            statusCode,
            "Authorization header is missing"
        );
    }

    const [scheme, token] = authHeader.trim().split(" ");

    if (scheme !== "Bearer" || !token) {
        throw new AppError(
            statusCode,
            "Invalid authorization format"
        );
    }

    return token;
};