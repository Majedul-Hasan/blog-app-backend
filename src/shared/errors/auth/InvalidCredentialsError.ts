import status from "http-status";
import AppError from "../base/AppError";

export class InvalidCredentialsError extends AppError {
    constructor(message = "Invalid email or password") {
        super(status.UNAUTHORIZED, message);
    }
}