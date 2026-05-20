import AppError from "../base/AppError";

export class ExternalServiceError extends AppError {
    constructor(serviceName: string) {
        super(502, `${serviceName} service failed`);
    }
}