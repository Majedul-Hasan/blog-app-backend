import status from "http-status";
import AppError from "../base/AppError";

export class UserNotFoundError extends AppError {
    constructor(message = "User not found") {
        super(status.NOT_FOUND, message);
    }
}