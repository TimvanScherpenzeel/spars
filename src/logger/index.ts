// Config
import { getConfigEntry } from '../config';
/**
 * console.log a message to the console in a prefixed format
 * Only logs when the highest verbosity level is set
 *
 * @param message Message to log in the console
 */
export const log = (message: string) =>
  getConfigEntry('LOG_VERBOSITY') >= 3 && console.log(`Ridge :: [LOG] -> ${message}`);

/**
 * console.warn a message to the console in a prefixed format
 * Only logs when the medium or highest verbosity level is set
 *
 * @param message Message to warn in the console
 */
export const warn = (message: string) =>
  getConfigEntry('LOG_VERBOSITY') >= 2 && console.warn(`Ridge :: [WARN] -> ${message}`);

/**
 * console.error a message to the console in a prefixed format
 * Only logs when the low, medium or highest verbosity level is set
 * Gets disabled if verbosity is set to 0 (usually the case in production)
 *
 * @param message Message to error in the console
 */
export const error = (message: string) =>
  getConfigEntry('LOG_VERBOSITY') >= 1 && console.error(`Ridge :: [ERROR] -> ${message}`);
