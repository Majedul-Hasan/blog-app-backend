import { Request, Response, NextFunction } from "express";

import logger from "./logger";

const requestLogger = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    logger.info(
        `${req.method} ${req.originalUrl}`,
        {
            ip: req.ip,
        }
    );

    next();
};

export default requestLogger;