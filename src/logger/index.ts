import * as winston from 'winston';
import { hostname } from 'os';
import { CustomLogger } from './custom-logger.class';

const osHostname = hostname();

/**
 * Function to custom our own log printer and being able to create our own winston custom format.
 *
 * @param {object} obj - Object of parameters.
 * @param {string} obj.timestamp - Timestamp (automatically filled by Winston).
 * @param {string} obj.level - Log level (debug|verbose|info|warn|error).
 * @param {string} obj.message - Log message.
 * @param {string} [obj.exception] - Exception in case of error (stack trace).
 * @param {object} [obj.optionalFields] - Object of optional fields to inject.
 *
 * @returns {string} Log as JSON string.
 */
export const customLogPrinter = ({
  timestamp, level, message, exception, optionalFields,
}) => JSON.stringify({
  env: process.env?.NODE_ENV,
  log_timestamp: timestamp,
  level,
  logger: 'custom-logger',
  message,
  hostname: osHostname,
  exception,
  ...optionalFields,
});

/**
 * @description Define winston format according to environment.
 *
 * @returns {object} Winston format.
 */
export const getFormat = () => {
  let format;
  if (process.env.NODE_ENV !== 'local') {
    format = winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
      winston.format.printf(customLogPrinter),
    );
  } else {
    // If we are running locally, do not log JSON but colored string easily understandable by human
    format = winston.format.combine(
      winston.format.colorize(),
      winston.format.printf(({ level, message }) => `[${level}]: ${message}`),
    );
  }
  return format;
};

/**
 * Function returning an instance of our custom Nest.js logger.
 * To be called directly in main.ts to create and set this logger instance globally for all the app.
 *
 * @returns {CustomLogger} - Instance of CustomLogger.
 */
export default function createCustomLogger(): CustomLogger {
  return new CustomLogger(
    winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      transports: new winston.transports.Console({
        format: getFormat(),
      }),
    }),
  );
}
