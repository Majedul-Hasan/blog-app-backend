import status from "http-status";
import AppError from "../base/AppError";

export class ValidationError extends AppError {
    constructor(message = "Validation failed", errorDetails?: unknown) {
        super(status.BAD_REQUEST, message, errorDetails);
    }
}