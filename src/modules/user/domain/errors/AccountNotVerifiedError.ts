import status from "http-status";
import AppError from "@shared/errors/base/AppError";

export class AccountNotVerifiedError extends AppError {
    constructor(massage = 'This account has not been verified yet.') {
        super(status.UNAUTHORIZED, massage);
    }
}