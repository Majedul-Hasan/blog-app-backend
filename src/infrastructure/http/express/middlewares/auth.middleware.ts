// infrastructure/http/express/middlewares/auth.middleware.ts

import { Request, Response, NextFunction } from "express";

import { extractBearerToken } from "@shared/security/extractBearerToken";
import { ForbiddenError } from "@shared/errors";
import { AuthenticationService } from "@modules/auth/application/services/authentication.service";

;

export const authMiddleware = (
    authService: AuthenticationService,
    ...roles: string[]
) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {

            const token =
                extractBearerToken(
                    req.headers.authorization
                );

            const user =
                await authService.authenticate(
                    token
                );

            if (
                roles.length &&
                !roles.includes(user.role)
            ) {
                throw new ForbiddenError;
            }

            req.user = user;

            next();

        } catch (error) {
            next(error);
        }
    };
};