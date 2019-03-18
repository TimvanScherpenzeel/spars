// Config
import { getConfigEntry } from '../config';

/**
 * console.log() a message to the console in a prefixed format
 * Only logs when the highest verbosity level is set
 *
 * @param message Message to log in the console
 */
export const log = (message: string) =>
  getConfigEntry('LOG_VERBOSITY') >= 3 && console.log(`Ridge :: [LOG] -> ${message}`);
