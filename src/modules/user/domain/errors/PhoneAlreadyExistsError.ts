import status from "http-status";
import AppError from "@shared/errors/base/AppError";

export class PhoneAlreadyExistsError extends AppError {
    constructor(massage = 'An account with this phone number already exists.') {
        super(status.UNAUTHORIZED, massage);
    }
}