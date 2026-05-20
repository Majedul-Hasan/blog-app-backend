
import status from "http-status";
import AppError from "../base/AppError";

export class TokenExpiredError extends AppError {
    constructor(message = "Token has expired") {
        super(status.UNAUTHORIZED, message);
    }
}