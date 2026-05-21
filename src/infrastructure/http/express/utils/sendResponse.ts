import { Response } from "express";

export type TMeta = {
    limit: number;
    page: number;
    total: number;
    totalPage?: number;
};

export type TResponse<T> = {
    statusCode: number;
    success?: boolean;
    message?: string;
    meta?: TMeta;
    data?: T;
};

const sendResponse = <T>(
    res: Response,
    payload: TResponse<T>
): void => {
    const {
        statusCode,
        success,
        message,
        meta,
        data,
    } = payload;

    res.status(statusCode).json({
        success: success ?? statusCode < 400,
        message,
        meta,
        data,
    });
};

export default sendResponse;