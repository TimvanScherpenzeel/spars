// Vendor
import Mitt from 'mitt';

const eventEmitter = new Mitt();

export { eventEmitter, Mitt as EventEmitter };
