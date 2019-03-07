// Vendor
import memwatch from 'node-memwatch';

// Source
import { eventEmitter, EventEmitter, EventReference } from '../../src/events/EventEmitter';

describe('EventEmitter', () => {
  it('is a function', () => {
    expect.assertions(1);

    expect(eventEmitter).toBeInstanceOf(EventEmitter);
  });

  it('is a function', () => {
    expect.assertions(1);

    expect(typeof EventEmitter).toEqual('function');
  });

  it('creates instances of itself', () => {
    expect.assertions(1);

    expect(new EventEmitter()).toBeInstanceOf(EventEmitter);
  });

  it('returns an EventEmitter instance when called without new', () => {
    expect.assertions(1);

    // @ts-ignore
    expect(EventEmitter()).toBeInstanceOf(EventEmitter);
  });

  describe('an instance', () => {
    let emitter: EventEmitter;

    beforeEach(() => {
      emitter = new EventEmitter();
    });

    it('has an "on" method', () => {
      expect.assertions(1);

      expect(typeof emitter.on).toBe('function');
    });

    it('has an "off" method', () => {
      expect.assertions(1);

      expect(typeof emitter.off).toBe('function');
    });

    it('has a "emit" method', () => {
      expect.assertions(1);

      expect(typeof emitter.emit).toBe('function');
    });
  });

  describe('the "on method"', () => {
    let emitter: EventEmitter;

    beforeEach(() => {
      emitter = new EventEmitter();
    });

    it('throws when given zero as a count', () => {
      expect.assertions(1);

      expect(() => {
        emitter.on('event-name', () => {}, 0);
      }).toThrow();
    });

    it('throws when given a negative integer as a count', () => {
      expect.assertions(1);

      expect(() => {
        emitter.on('event-name', () => {}, -1);
      }).toThrow();
    });

    it('throws when given a float as a count', () => {
      expect.assertions(1);

      expect(() => {
        emitter.on('event-name', () => {}, 1.5);
      }).toThrow();
    });

    it('does not throw when called with a positive integer as a count', () => {
      expect.assertions(1);

      expect(() => {
        emitter.on('event-name', () => {}, 10);
      }).not.toThrow();
    });

    it('does not throw when given no count', () => {
      expect.assertions(1);

      expect(() => {
        emitter.on('event-name', () => {}, 10);
      }).not.toThrow();
    });

    it('returns an EventReference', () => {
      expect.assertions(1);

      expect(emitter.on('event-name', () => {})).toBeInstanceOf(EventReference);
    });
  });

  // describe('memory leaks', () => {
  //   describe('EventEmitter instances', () => {
  //     let heapDiff: any;
  //     let results: any;

  //     beforeAll(() => {
  //       heapDiff = new memwatch.HeapDiff();

  //       for (let i = 0; i < 25; i++) {
  //         new EventEmitter();
  //       }

  //       const event = new EventEmitter();

  //       results = heapDiff.end();
  //     });

  //     it('can be cleared by the garbarge collector', () => {
  //       expect.assertions(1);

  //       const emitterChange = results.change.details.find(
  //         (detail: any) => detail.what === 'EventEmitter'
  //       );

  //       expect(emitterChange && emitterChange['+']).toEqual(1);
  //     });
  //   });
  // });

  // describe('EventHandler instances', () => {
  //   let heapDiff: any;
  //   let results: any;

  //   beforeAll(() => {
  //     heapDiff = new memwatch.HeapDiff();

  //     for (let i = 0; i < 25; i++) {
  //       new EventEmitter().on('test', () => {});
  //     }

  //     const reference = new EventEmitter().on('test', () => {});

  //     results = heapDiff.end();
  //   });

  //   it('can be cleared by the garbage collector', () => {
  //     expect.assertions(1);

  //     const referenceChange = results.change.details.find(
  //       (detail: any) => detail.what === 'EventReference'
  //     );

  //     expect(referenceChange && referenceChange['+']).toEqual(1);
  //   });
  // });
});
