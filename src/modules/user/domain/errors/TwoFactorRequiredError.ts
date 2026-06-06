import status from "http-status";
import AppError from "@shared/errors/base/AppError";

export class TwoFactorRequiredError extends AppError {
    constructor(massage = 'Two-factor authentication is required to complete this action.') {
        super(status.UNAUTHORIZED, massage);
    }
}