export type IGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorMessages: IGenericErrorItem[];
    meta?: Record<string, any>; // optional extra info
};

export type IGenericErrorItem = {
    path: string | number;
    message: string;
};
