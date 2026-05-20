import status from "http-status";
import AppError from "../base/AppError";

export class UnauthorizedError
    extends AppError {

    constructor(message = "Unauthorized") {
        super(status.UNAUTHORIZED, message);
    }
}