// Source
import { eventEmitter, EventEmitter } from '../../src/events/EventEmitter';

describe('EventEmitter', () => {
  it('is a function', () => {
    expect.assertions(1);

    expect(typeof EventEmitter).toEqual('function');
  });
});
