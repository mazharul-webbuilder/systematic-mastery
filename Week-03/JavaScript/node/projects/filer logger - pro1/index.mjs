import Logger from "./Logger.mjs";

const logger = new Logger('logs.txt');

await logger.info('Server started');
await logger.warn('Memory usage high');
await logger.error('Failed to connect DB');

console.log(logger.getLogs());