// Vendor
import Mitt from 'mitt';

/**
 * Inspired by https://github.com/developit/mitt
 */
const eventEmitter = new Mitt();

export { eventEmitter, Mitt as EventEmitter };
