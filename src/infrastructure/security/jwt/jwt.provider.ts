import { ITokenProvider, GenerateTokenOptions } from "@shared/security/interfaces/token-provider.interface";
import jwt, { Secret, SignOptions } from "jsonwebtoken";

export class JwtTokenProvider
    implements ITokenProvider {

    constructor(
        private readonly secret: Secret
    ) { }

    generate<T extends object>(
        payload: T,
        options?: GenerateTokenOptions
    ): string {
        return jwt.sign(payload, this.secret, {
            algorithm: "HS256",
            expiresIn:
                options?.expiresIn as SignOptions["expiresIn"],
        });
    }

    verify<T extends object>(
        token: string
    ): T {
        const decoded = jwt.verify(
            token,
            this.secret
        );

        if (typeof decoded === "string") {
            throw new Error(
                "Invalid token payload"
            );
        }

        return decoded as T;
    }
}
