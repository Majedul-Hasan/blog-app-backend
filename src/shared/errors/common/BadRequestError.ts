import status from "http-status";
import AppError from "../base/AppError";

export class BadRequestError extends AppError {
    constructor(message = "Bad request") {
        super(status.BAD_REQUEST, message);
    }
}