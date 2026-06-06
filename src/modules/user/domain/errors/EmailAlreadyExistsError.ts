import status from "http-status";
import AppError from "@shared/errors/base/AppError";

export class EmailAlreadyExistsError extends AppError {
    constructor(massage = 'An account with this email address already exists.') {
        super(status.UNAUTHORIZED, massage);
    }
}