import status from "http-status";
import AppError from "@shared/errors/base/AppError";

export class VerificationCodeInvalidError extends AppError {
    constructor(massage = 'The provided verification code is invalid. Please check the code and try again.') {
        super(status.UNAUTHORIZED, massage);
    }
}