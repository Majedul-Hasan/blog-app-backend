
const parseMongoDuplicateKeyError = (
    error: any
): string => {

    const field = Object.keys(error.keyPattern || {})[0];
    const value = error.keyValue?.[field];

    if (!field) {
        return "Duplicate key error";
    }

    return `${field} '${value}' already exists`;
};

export default parseMongoDuplicateKeyError;