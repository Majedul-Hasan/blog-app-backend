import config from "@shared/config/env.const";
import jwt from "jsonwebtoken";

export type JwtPayload = {
    userId: string;
    email: string;
    role: string;
};

export class TokenService {
    private accessSecret = config.jwt.jwt_secret || "secret";
    private refreshSecret = config.jwt.jwt_refresh_secret || "refresh_secret";

    generateAccessToken(payload: JwtPayload): string {
        return jwt.sign(payload, this.accessSecret, {
            expiresIn: "15m",
        });
    }

    generateRefreshToken(payload: JwtPayload): string {
        return jwt.sign(payload, this.refreshSecret, {
            expiresIn: "7d",
        });
    }

    verifyAccessToken(token: string): JwtPayload {
        return jwt.verify(token, this.accessSecret) as JwtPayload;
    }

    verifyRefreshToken(token: string): JwtPayload {
        return jwt.verify(token, this.refreshSecret) as JwtPayload;
    }
}