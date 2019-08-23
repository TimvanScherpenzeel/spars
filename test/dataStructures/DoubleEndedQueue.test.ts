// Source
import { DoubleEndedQueue } from '../../src/dataStructures/DoubleEndedQueue';

describe('DoubleEndedQueue', () => {
  it('should take no argument', () => {
    expect.assertions(1);

    const doubleEndedQueue = new DoubleEndedQueue();

    expect(doubleEndedQueue.size()).toStrictEqual(0);
  });

  it('should take an array argument using fromArray', () => {
    expect.assertions(4);

    const A = [1, 2, 3, 4];
    const doubleEndedQueueA = new DoubleEndedQueue();

    doubleEndedQueueA.fromArray(A);

    expect(doubleEndedQueueA.size()).toBeGreaterThanOrEqual(A.length);
    expect(doubleEndedQueueA.toArray()).toEqual(A);

    const B: any[] = [];
    const doubleEndedQueueB = new DoubleEndedQueue();

    doubleEndedQueueB.fromArray(B);

    expect(doubleEndedQueueA.size()).toBeGreaterThanOrEqual(A.length);
    expect(doubleEndedQueueA.toArray()).toEqual(A);
  });
});
