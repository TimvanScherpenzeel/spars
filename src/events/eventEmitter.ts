// Utilities
import { assert } from '../utilities';

// EventReference instances are keys, and objects with information about a
// callback are values.
const handlersMap = new WeakMap();

// This WeapMap instance has EventEmitter instances as keys, and Map instances
// as values. The Map instances have event names as keys, and Set instances as
// values. The Set instance associated with an event name contains all the
// EventHandler instances associated with the event with that name for that
// emitter.
const eventsMap = new WeakMap();

// EventReference instances are used as keys to get information about event
// callbacks. An event can also be cancelled with an EventReference instance.
export class EventReference {
  constructor(eventName: string, callback: () => void, count: number) {
    handlersMap.set(this, {
      callback,
      count,
      eventName,
    });
  }
}

/**
 * Event emitter that actively avoids memory leaks
 *
 * Inspired by https://github.com/qubyte/vertebrate-event-emitter
 */
// tslint:disable-next-line:max-classes-per-file
export class EventEmitter {
  constructor() {
    if (!(this instanceof EventEmitter)) {
      return new EventEmitter();
    }

    eventsMap.set(this, new Map());
  }

  /**
   * Add a listener function callback to the emitter for the given name.
   * A reference object is returned, which may later be used to unregister the listener.
   *
   * @param eventName Name of the event
   * @param callback Callback to trigger
   * @param count Number of times the event can be called before the listener is automatically unregistered (1, or Infinity)
   */
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

  /**
   * Unregister an event listener using the reference object returned by emitter.on()
   *
   * @param handler Event handler to unregister
   */
  public off(handler: any) {
    const eventName = handlersMap.get(handler).eventName;
    const eventsForThisEmitter = eventsMap.get(this);
    const eventsForThisEventName = eventsForThisEmitter.get(eventName);

    if (eventsForThisEventName) {
      eventsForThisEventName.delete(handler);
    }
  }

  /**
   * Trigger all handlers for the given name with the remaining arguments args.
   * The callbacks are called with the emitter as this.
   *
   * @param eventName Name of the event
   * @param args Rest of the arguments to call callback with
   */
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

  /**
   * When called with a name string, all events for that name are removed from the emitter.
   * When called without a name string, all events for all names are removed.
   *
   * @param eventName Name of the event
   */
  public delete(eventName?: string) {
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
