// src/errors/parsePrismaValidationError.ts

const parsePrismaValidationError = (errorMessage: string): string => {
    const missingFieldsRegex = /Argument `(.+?)` is missing\./g;
    const invalidValueRegex =
        /Argument `(.+?)`: Invalid value provided. Expected (.+), provided (.+)\./g;

    let match;
    const missingFields: string[] = [];
    const invalidValues: string[] = [];

    while ((match = missingFieldsRegex.exec(errorMessage)) !== null) {
        missingFields.push(match[1] as string);
    }

    while ((match = invalidValueRegex.exec(errorMessage)) !== null) {
        invalidValues.push(
            `${match[1]}: Expected ${match[2]}, provided ${match[3]}`
        );
    }

    return [
        missingFields.length && `Missing fields: ${missingFields.join(", ")}`,
        invalidValues.length && `Invalid values: ${invalidValues.join("; ")}`,
    ]
        .filter(Boolean)
        .join("; ");
};




export default parsePrismaValidationError;

