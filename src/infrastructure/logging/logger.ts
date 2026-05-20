
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const {
    combine,
    timestamp,
    errors,
    splat,
    printf,
    colorize,
} = winston.format;

const isProduction =
    process.env.NODE_ENV === "production";

const readableFormat = printf(
    ({ timestamp, level, message, stack, service, ...meta }) => {

        const metaString =
            Object.keys(meta).length
                ? `\n${JSON.stringify(meta, null, 2)}`
                : "";

        return `${timestamp} [${service}] ${level}: ${stack || message}${metaString}`;
    }
);

const logger = winston.createLogger({
    level: isProduction ? "info" : "debug",

    defaultMeta: {
        service:
            process.env.SERVICE_NAME ||
            "default-service-api",
    },

    format: combine(
        timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }),
        errors({ stack: true }),
        splat(),
        readableFormat
    ),

    transports: [
        new winston.transports.Console({
            format: combine(
                colorize(),
                readableFormat
            ),
        }),
    ],
});

if (isProduction) {

    logger.add(
        new DailyRotateFile({
            dirname: "logs",
            filename: "app-%DATE%.log",
            datePattern: "YYYY-MM-DD",
            maxSize: "20m",
            maxFiles: "14d",
        })
    );

    logger.add(
        new DailyRotateFile({
            dirname: "logs",
            filename: "error-%DATE%.log",
            level: "error",
            datePattern: "YYYY-MM-DD",
            maxSize: "20m",
            maxFiles: "30d",
        })
    );
}

export default logger;