// Utilities
import { assert } from '../utilities';

const handlersMap = new WeakMap();
const eventsMap = new WeakMap();

export class EventReference {
  constructor(eventName: string, callback: () => void, count: number) {
    handlersMap.set(this, {
      callback,
      count,
      eventName,
    });
  }
}

// tslint:disable-next-line:max-classes-per-file
export class EventEmitter {
  constructor() {
    if (!(this instanceof EventEmitter)) {
      return new EventEmitter();
    }

    eventsMap.set(this, new Map());
  }

  public on(eventName: string, callback: () => void, count: number = Infinity) {
    assert(
      count === Infinity || (Math.floor(count) === count && count > 0),
      'Count must not be set to an integer less than zero or a non-integer value'
    );

    const eventsForThisEmitter = eventsMap.get(this);
    let eventsForThisEventName = eventsForThisEmitter.get(eventName);
    const eventReference = new EventReference(eventName, callback, count);

    if (!eventsForThisEventName) {
      eventsForThisEventName = new Set();
      eventsForThisEmitter.set(eventName, eventsForThisEventName);
    }

    eventsForThisEventName.add(eventReference);

    return eventReference;
  }

  public off(handler: any) {
    const eventName = handlersMap.get(handler).eventName;
    const eventsForThisEmitter = eventsMap.get(this);
    const eventsForThisEventName = eventsForThisEmitter.get(eventName);

    if (eventsForThisEventName) {
      eventsForThisEventName.delete(handler);
    }
  }

  public emit(eventName: string, ...args: any) {
    const eventsForThisEmitter = eventsMap.get(this);
    const eventsForThisEventName = eventsForThisEmitter.get(eventName) || [];
    const emitter = this;

    eventsForThisEventName.forEach((eventReference: EventReference) => {
      const done = this.useCallback(emitter, eventReference, args);

      if (done) {
        eventsForThisEventName.delete(eventReference);
      }
    });
  }

  public dispose(eventName?: string) {
    const eventsForThisEmitter = eventsMap.get(this);

    if (typeof eventName === 'string') {
      eventsForThisEmitter.delete(eventName);
    } else {
      eventsForThisEmitter.clear();
    }
  }

  private useCallback(emitter: EventEmitter, eventReference: EventReference, options?: any) {
    const privateData = handlersMap.get(eventReference);

    privateData.callback.apply(emitter, options);
    privateData.count--;

    return privateData.count === 0;
  }
}

export const eventEmitter = new EventEmitter();
