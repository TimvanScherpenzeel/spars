// Config
import { getConfigEntry } from '../config';

/**
 * console.warn() a message to the console in a prefixed format
 * Only logs when the medium or highest verbosity level is set
 *
 * @param message Message to warn in the console
 */
export const warn = (message: string) =>
  getConfigEntry('LOG_VERBOSITY') >= 2 && console.warn(`Ridge :: [WARN] -> ${message}`);
