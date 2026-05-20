import { ZodError } from "zod";
import AppError from "./AppError";
import handleZodError from "../handlers/zod/handleZodError";
import handleMongooseError from "../handlers/mongoose/handleMongooseError";


const normalizeError = (error: any): AppError => {
    if (error instanceof AppError) {
        return error;
    }
    if (error instanceof ZodError) {
        const simplified = handleZodError(error);
        return new AppError(
            simplified.statusCode,
            simplified.message,
            simplified.errorMessages
        );
    }
    const mongooseError = handleMongooseError(error);
    if (mongooseError) return mongooseError;
    // const prismaError = handlePrismaError(error);
    // if (prismaError) return prismaError;

    if (error instanceof SyntaxError) {
        return new AppError(400, "Invalid JSON payload");
    }
    if (error instanceof Error) {
        return new AppError(
            500,
            error.message || "Internal server error",
            null,
            false
        );
    }
    return new AppError(500, "Internal server error", null, false);
};

export default normalizeError;

