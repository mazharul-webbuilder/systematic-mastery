import Logger from './logger.mjs';

const logger = new Logger('app.log');

await Promise.all([
    logger.info("Server started"),
    logger.warn("Low memory"),
    logger.error("DB connection failed"),
    logger.info("Retrying connection..."),
    logger.info("Server started"),
    logger.warn("Low memory"),
    logger.error("DB connection failed"),
    logger.info("Retrying connection..."),
    logger.info("Server started"),
    logger.warn("Low memory"),
    logger.error("DB connection failed"),
    logger.info("Retrying connection..."),
    logger.info("Server started"),
    logger.warn("Low memory"),
    logger.error("DB connection failed"),
    logger.info("Retrying connection..."),
]);

console.log(logger.getLogs());
