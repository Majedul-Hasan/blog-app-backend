import status from "http-status";
import AppError from "../base/AppError";

export class UserExistsError extends AppError {
    constructor(message = "User already exists") {
        super(status.CONFLICT, message);
    }
}