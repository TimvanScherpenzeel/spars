// Source
import { DoubleEndedQueue } from '../../src/dataStructures/DoubleEndedQueue';

describe('DoubleEndedQueue', () => {
  it('should take no argument', () => {
    expect.assertions(1);

    const doubleEndedQueue = new DoubleEndedQueue();

    expect(doubleEndedQueue.getSize()).toStrictEqual(0);
  });

  it('should take an array argument using fromArray', () => {
    expect.assertions(4);

    const A = [1, 2, 3, 4];
    const doubleEndedQueueA = new DoubleEndedQueue(A);

    expect(doubleEndedQueueA.getSize()).toBeGreaterThanOrEqual(A.length);
    expect(doubleEndedQueueA.toArray()).toEqual(A);

    const B: any[] = [];
    const doubleEndedQueueB = new DoubleEndedQueue();

    doubleEndedQueueB.fromArray(B);

    expect(doubleEndedQueueA.getSize()).toBeGreaterThanOrEqual(A.length);
    expect(doubleEndedQueueA.toArray()).toEqual(A);
  });

  it('should handle high volume traffic', () => {
    const doubleEndedQueue = new DoubleEndedQueue();
    let A = 2500000;

    while (--A) {
      doubleEndedQueue.push(A);
      doubleEndedQueue.insert(A);
    }

    let B = 2500000;

    while (--B) {
      const itemB = doubleEndedQueue.shift();
      doubleEndedQueue.pop();
      doubleEndedQueue.shift();
      doubleEndedQueue.push(itemB);
      doubleEndedQueue.shift();
      doubleEndedQueue.shift();
    }
  });

  it('should add a single item with plenty of capacity', () => {
    const doubleEndedQueue = new DoubleEndedQueue();
    doubleEndedQueue.fromArray([1, 2, 3, 4, 5]);

    // TODO: https://github.com/invertase/denque/blob/master/test/denque.js
  });
});
