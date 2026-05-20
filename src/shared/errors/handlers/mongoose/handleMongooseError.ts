// src/shared/errors/handlers/mongoose/handleMongooseError.ts

import status from "http-status";
import mongoose from "mongoose";

import AppError from "../../base/AppError";

import parseMongoDuplicateKeyError from "./parseMongoDuplicateKeyError";
import parseMongooseValidationError from "./parseMongooseValidationError";
import { IGenericErrorItem } from "@shared/errors/types/GenericErrorResponse";
import { ValidationError } from "@shared/errors/validation/ValidationError";

const wrap = (
    message: string,
    path = ""
): IGenericErrorItem[] => [
        { path, message }
    ];

const handleMongooseError = (
    error: unknown
): AppError | null => {

    /**
     * Mongoose Validation Error
     */
    if (error instanceof mongoose.Error.ValidationError) {
        const errorMessages = parseMongooseValidationError(error);
        return new ValidationError("Validation Error", errorMessages)
    }

    /**
     * Invalid Mongo ObjectId
     */
    if (error instanceof mongoose.Error.CastError) {

        return new ValidationError("Invalid ID",
            wrap(
                `Invalid ${error.path}: ${error.value}`,
                error.path
            ))
    }

    /**
     * Duplicate Key Error
     * MongoServerError code 11000
     */
    if (
        error instanceof mongoose.mongo.MongoServerError &&
        error.code === 11000
    ) {

        const message = parseMongoDuplicateKeyError(error);

        return new AppError(
            status.CONFLICT,
            "Conflict",
            wrap(message)
        );
    }

    /**
     * Strict mode error
     */
    if (error instanceof mongoose.Error.StrictModeError) {

        return new AppError(
            status.BAD_REQUEST,
            "Strict mode error",
            wrap(error.message)
        );
    }

    /**
     * Document not found
     */
    if (error instanceof mongoose.Error.DocumentNotFoundError) {

        return new AppError(
            status.NOT_FOUND,
            "Document not found",
            wrap(error.message)
        );
    }

    return null;
};

export default handleMongooseError;