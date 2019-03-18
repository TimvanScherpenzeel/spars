// Vendor
import Mitt from 'mitt';

// An extremely simple event emitter singleton allowing global event handling

// https://github.com/developit/mitt

const eventEmitter = new Mitt();

export { eventEmitter };
