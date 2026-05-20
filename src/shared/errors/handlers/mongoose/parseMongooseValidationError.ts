// src/shared/errors/handlers/mongoose/parseMongooseValidationError.ts

import { IGenericErrorItem } from "@shared/errors/types/GenericErrorResponse";
import { Error } from "mongoose";


const parseMongooseValidationError = (
    error: Error.ValidationError
): IGenericErrorItem[] => {

    return Object.values(error.errors).map(err => ({
        path: err.path,
        message: err.message,
    }));
};

export default parseMongooseValidationError;