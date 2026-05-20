import status from "http-status";
import AppError from "../base/AppError";

export class TooManyRequestsError extends AppError {
    constructor(message = "Too many requests") {
        super(status.TOO_MANY_REQUESTS, message);
    }
}
