import status from "http-status";
import AppError from "../base/AppError";

export class ForbiddenError extends AppError {
    constructor(message = "Forbidden") {
        super(status.FORBIDDEN, message);
    }
}