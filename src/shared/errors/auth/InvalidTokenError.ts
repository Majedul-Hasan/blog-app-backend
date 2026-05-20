
import status from "http-status";
import AppError from "../base/AppError";

export class InvalidTokenError extends AppError {
    constructor(message = "Invalid token") {
        super(status.UNAUTHORIZED, message);
    }
}