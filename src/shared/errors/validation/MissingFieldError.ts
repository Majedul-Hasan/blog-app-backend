
import status from "http-status";
import AppError from "../base/AppError";

export class MissingFieldError extends AppError {
    constructor(fieldName: string) {
        super(status.BAD_REQUEST, `${fieldName} is required`);
    }
}