import status from "http-status";
import AppError from "@shared/errors/base/AppError";

export class AccountDisabledError extends AppError {
    constructor(massage = 'This account has been disabled. Please contact support.') {
        super(status.UNAUTHORIZED, massage);
    }
}