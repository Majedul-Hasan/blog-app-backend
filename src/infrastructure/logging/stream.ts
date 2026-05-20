import logger from "./logger";

const stream = {
    write: (message: string) => {
        logger.info(message.trim());
    },
};

export default stream;