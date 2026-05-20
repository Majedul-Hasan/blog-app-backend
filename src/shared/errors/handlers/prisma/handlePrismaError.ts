

// import {
//     PrismaClientValidationError, PrismaClientKnownRequestError,
//     PrismaClientInitializationError, PrismaClientRustPanicError, PrismaClientUnknownRequestError
// } from "../../generated/prisma/internal/prismaNamespace";
/*
import status from "http-status";
import parsePrismaValidationError from "./parsePrismaValidationError";
import AppError from "../base/AppError";
import { IGenericErrorItem } from "../../app/interfaces/error";
import {
    PrismaClientValidationError, PrismaClientKnownRequestError,
    PrismaClientInitializationError, PrismaClientRustPanicError, PrismaClientUnknownRequestError
} from "@prisma/internal/prismaNamespace";

const wrap = (message: string, path = ""): IGenericErrorItem[] => [{ path, message }];

const handlePrismaError = (error: unknown): AppError | null => {
    // Prisma validation error (invalid payload types, missing required args etc.)
    if (error instanceof PrismaClientValidationError) {
        const parsed = parsePrismaValidationError(error.message);
        return new AppError(
            status.BAD_REQUEST,
            "Validation error",
            parsed ? wrap(parsed) : wrap("Invalid input data")
        );
    }
    // Prisma known request errors (P20xx)
    if (error instanceof PrismaClientKnownRequestError) {
        const code = error.code;

        switch (code) {
            case "P2025": {
                const msg =
                    (error.meta?.cause as string) ||
                    "Record not found for the given criteria.";
                return new AppError(status.NOT_FOUND, "Not found", wrap(msg));
            }

            case "P2002": {
                // unique constraint
                const target = (error.meta?.target as string[])?.join(", ");
                const msg = target
                    ? `Unique constraint failed on: ${target}`
                    : "Unique constraint failed.";
                return new AppError(status.CONFLICT, "Conflict", wrap(msg));
            }

            case "P2003": {
                // FK constraint
                const field = error.meta?.field_name as string | undefined;
                const msg = field
                    ? `Foreign key constraint failed on field: ${field}`
                    : "Foreign key constraint failed.";
                return new AppError(status.BAD_REQUEST, "Bad request", wrap(msg));
            }

            case "P2000": {
                // value too long for column
                return new AppError(
                    status.BAD_REQUEST,
                    "Bad request",
                    wrap("Invalid value for a field (value too long).")
                );
            }

            case "P2001": {
                // record does not exist (where condition)
                return new AppError(status.NOT_FOUND, "Not found", wrap("Record not found."));
            }

            case "P2012": {
                // missing required value
                return new AppError(
                    status.BAD_REQUEST,
                    "Validation error",
                    wrap("Missing a required value.")
                );
            }

            case "P2026": {
                return new AppError(
                    status.BAD_REQUEST,
                    "Bad request",
                    wrap("Related records prevent this operation.")
                );
            }

            case "P2027": {
                return new AppError(
                    status.BAD_REQUEST,
                    "Bad request",
                    wrap("Operation would result in data loss.")
                );
            }

            case "P2030": {
                return new AppError(
                    status.BAD_REQUEST,
                    "Bad request",
                    wrap("There was an issue updating the record.")
                );
            }

            default: {
                // keep details for debugging but do not expose raw error in production
                return new AppError(
                    status.INTERNAL_SERVER_ERROR,
                    "Database request error",
                    wrap(`Prisma error code: ${code}`)
                );
            }
        }
    }

    // Initialization errors are NOT operational (usually DB connectivity / config)
    if (error instanceof PrismaClientInitializationError) {
        return new AppError(
            status.INTERNAL_SERVER_ERROR,
            "Database connection failed",
            wrap("Failed to initialize Prisma Client."),
            false
        );
    }

    // Rust panic is NOT operational (engine crash)
    if (error instanceof PrismaClientRustPanicError) {
        return new AppError(
            status.INTERNAL_SERVER_ERROR,
            "Critical database engine error",
            wrap("Prisma engine panic."),
            false
        );
    }

    // Unknown request errors are NOT operational (something deep is wrong)
    if (error instanceof PrismaClientUnknownRequestError) {
        return new AppError(
            status.INTERNAL_SERVER_ERROR,
            "Unknown database error",
            wrap("Unknown Prisma request error."),
            false
        );
    }

    return null;
};



export default handlePrismaError;
*/