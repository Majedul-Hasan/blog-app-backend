
import status from "http-status";
import AppError from "../base/AppError";

export class NotFoundError extends AppError {
    constructor(resource = "Resource") {
        super(status.NOT_FOUND, `${resource} not found`);
    }
}