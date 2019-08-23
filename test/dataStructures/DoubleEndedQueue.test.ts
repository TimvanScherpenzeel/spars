// Source
import { DoubleEndedQueue } from '../../src/dataStructures/DoubleEndedQueue';

describe('DoubleEndedQueue', () => {
  it('should take no argument', () => {
    expect.assertions(1);

    const doubleEndedQueue = new DoubleEndedQueue();

    expect(doubleEndedQueue.length).toStrictEqual(0);
  });

  it('should take an array argument', () => {
    expect.assertions(4);

    const A = [1, 2, 3, 4];
    const doubleEndedQueueA = new DoubleEndedQueue(A);

    expect(doubleEndedQueueA.length).toBeGreaterThanOrEqual(A.length);
    expect(doubleEndedQueueA.toArray()).toEqual(A);

    const B: any[] = [];
    const doubleEndedQueueB = new DoubleEndedQueue([]);

    expect(doubleEndedQueueB.length).toBeGreaterThanOrEqual(B.length);
    expect(doubleEndedQueueB.toArray()).toEqual(B);
  });

  it('should handle high volume traffic', () => {
    expect.assertions(0);

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

  it('should add a single item with plenty of capacity left', () => {
    expect.assertions(6);

    const doubleEndedQueue = new DoubleEndedQueue([1, 2, 3, 4, 5]);

    // @ts-ignore internalList is a private variable
    expect(doubleEndedQueue.internalList.length - doubleEndedQueue.length).toBeGreaterThan(1);
    const beforeInsertion = doubleEndedQueue.length;
    const itemIndex = doubleEndedQueue.insert('A');

    expect(itemIndex).toStrictEqual(beforeInsertion + 1);
    expect(doubleEndedQueue.length).toStrictEqual(itemIndex);
    expect(itemIndex).toStrictEqual(6);
    expect(doubleEndedQueue.toArray()).toEqual(['A', 1, 2, 3, 4, 5]);
    expect(doubleEndedQueue.toString()).toEqual('["A",1,2,3,4,5]');
  });

  it('should add a single item with over capacity', () => {
    expect.assertions(6);

    // prettier-ignore
    const doubleEndedQueue = new DoubleEndedQueue([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);

    // @ts-ignore internalList is a private variable
    expect(doubleEndedQueue.internalList.length / doubleEndedQueue.length).toEqual(2);
    const beforeInsertion = doubleEndedQueue.length;
    const itemIndex = doubleEndedQueue.insert('A');

    expect(itemIndex).toStrictEqual(beforeInsertion + 1);
    expect(doubleEndedQueue.length).toStrictEqual(itemIndex);
    expect(itemIndex).toStrictEqual(17);
    // prettier-ignore
    expect(doubleEndedQueue.toArray()).toEqual(['A', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
    expect(doubleEndedQueue.toString()).toEqual('["A",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]');
  });
});
