import status from "http-status";
import AppError from "@shared/errors/base/AppError";

export class VerificationCodeExpiredError extends AppError {
    constructor(massage = 'The verification code has expired. Please request a new one.') {
        super(status.UNAUTHORIZED, massage);
    }
}