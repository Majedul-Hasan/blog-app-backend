
import status from "http-status";
import AppError from "../base/AppError";

export class ConflictError extends AppError {
    constructor(message = "Conflict occurred") {
        super(status.CONFLICT, message);
    }
}