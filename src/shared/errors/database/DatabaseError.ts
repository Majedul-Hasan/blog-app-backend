
import status from "http-status";
import AppError from "../base/AppError";

export class DatabaseError extends AppError {
    constructor(message = "Database operation failed") {
        super(status.INTERNAL_SERVER_ERROR, message);
    }
}