import Mitt from 'mitt';
/**
 * Inspired by https://github.com/developit/mitt
 */
declare const eventEmitter: Mitt.Emitter;
export { eventEmitter, Mitt as EventEmitter };
