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
      doubleEndedQueue.unshift(A);
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
    const itemIndex = doubleEndedQueue.unshift('A');

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
    const itemIndex = doubleEndedQueue.unshift('A');

    expect(itemIndex).toStrictEqual(beforeInsertion + 1);
    expect(doubleEndedQueue.length).toStrictEqual(itemIndex);
    expect(itemIndex).toStrictEqual(17);
    // prettier-ignore
    expect(doubleEndedQueue.toArray()).toEqual(['A', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
    expect(doubleEndedQueue.toString()).toEqual('["A",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]');
  });

  it('should return the item at the back of the queue', () => {
    expect.assertions(8);

    const A: any[] = [];
    const doubleEndedQueueA = new DoubleEndedQueue(A);

    expect(doubleEndedQueueA.length).toEqual(0);
    expect(doubleEndedQueueA.pop()).toEqual(undefined);
    expect(doubleEndedQueueA.pop()).toEqual(undefined);
    expect(doubleEndedQueueA.length).toEqual(0);

    const B = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const doubleEndedQueueB = new DoubleEndedQueue(B);

    expect(doubleEndedQueueB.pop()).toEqual(9);
    expect(doubleEndedQueueB.pop()).toEqual(8);
    B.pop();
    B.pop();

    expect(doubleEndedQueueB.toArray()).toEqual(B);

    doubleEndedQueueB.unshift(5);
    doubleEndedQueueB.unshift(4);
    doubleEndedQueueB.unshift(3);
    doubleEndedQueueB.unshift(2);
    doubleEndedQueueB.unshift(1);

    doubleEndedQueueB.push(1);
    doubleEndedQueueB.push(2);
    doubleEndedQueueB.push(3);
    doubleEndedQueueB.push(4);
    doubleEndedQueueB.push(5);

    doubleEndedQueueB.unshift(3);
    doubleEndedQueueB.unshift(2);
    doubleEndedQueueB.unshift(1);

    doubleEndedQueueB.pop();

    B.unshift(1, 2, 3, 4, 5);
    B.push(1, 2, 3, 4, 5);
    B.unshift(1, 2, 3);

    B.pop();

    expect(doubleEndedQueueB.toArray()).toEqual(B);
  });

  it('should return the item at the front of the queue', () => {
    expect.assertions(6);

    const A = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const doubleEndedQueueA = new DoubleEndedQueue(A);

    expect(doubleEndedQueueA.shift()).toEqual(1);
    expect(doubleEndedQueueA.shift()).toEqual(2);

    A.shift();
    A.shift();

    expect(doubleEndedQueueA.toArray()).toEqual(A);

    doubleEndedQueueA.unshift(5);
    doubleEndedQueueA.unshift(4);
    doubleEndedQueueA.unshift(3);
    doubleEndedQueueA.unshift(2);
    doubleEndedQueueA.unshift(1);

    doubleEndedQueueA.push(1);
    doubleEndedQueueA.push(2);
    doubleEndedQueueA.push(3);
    doubleEndedQueueA.push(4);
    doubleEndedQueueA.push(5);

    doubleEndedQueueA.unshift(3);
    doubleEndedQueueA.unshift(2);
    doubleEndedQueueA.unshift(1);

    doubleEndedQueueA.shift();

    A.unshift(1, 2, 3, 4, 5);
    A.push(1, 2, 3, 4, 5);
    A.unshift(1, 2, 3);
    A.shift();

    expect(doubleEndedQueueA.toArray()).toEqual(A);

    expect(doubleEndedQueueA.shift()).toEqual(A.shift());

    expect(doubleEndedQueueA.toArray()).toEqual(A);
  });

  it('should return undefined on nonsencial argument', () => {
    expect.assertions(9);

    const doubleEndedQueue = new DoubleEndedQueue([1, 2, 3, 4]);

    expect(doubleEndedQueue.peekAtIndex(-5)).toEqual(undefined);
    expect(doubleEndedQueue.peekAtIndex(-100)).toEqual(undefined);
    // @ts-ignore peekAtIndex expects numerical values
    expect(doubleEndedQueue.peekAtIndex(undefined)).toEqual(undefined);
    // @ts-ignore peekAtIndex expects numerical values
    expect(doubleEndedQueue.peekAtIndex('1')).toEqual(undefined);
    expect(doubleEndedQueue.peekAtIndex(NaN)).toEqual(undefined);
    expect(doubleEndedQueue.peekAtIndex(Infinity)).toEqual(undefined);
    expect(doubleEndedQueue.peekAtIndex(-Infinity)).toEqual(undefined);
    expect(doubleEndedQueue.peekAtIndex(1.5)).toEqual(undefined);
    expect(doubleEndedQueue.peekAtIndex(4)).toEqual(undefined);
  });

  it('should support positive indexing', () => {
    expect.assertions(4);

    const doubleEndedQueue = new DoubleEndedQueue([1, 2, 3, 4]);

    expect(doubleEndedQueue.peekAtIndex(0)).toEqual(1);
    expect(doubleEndedQueue.peekAtIndex(1)).toEqual(2);
    expect(doubleEndedQueue.peekAtIndex(2)).toEqual(3);
    expect(doubleEndedQueue.peekAtIndex(3)).toEqual(4);
  });

  it('should support negative indexing', () => {
    expect.assertions(4);

    const doubleEndedQueue = new DoubleEndedQueue([1, 2, 3, 4]);

    expect(doubleEndedQueue.peekAtIndex(-1)).toEqual(4);
    expect(doubleEndedQueue.peekAtIndex(-2)).toEqual(3);
    expect(doubleEndedQueue.peekAtIndex(-3)).toEqual(2);
    expect(doubleEndedQueue.peekAtIndex(-4)).toEqual(1);
  });

  it('should return true on empty queue', () => {
    expect.assertions(2);

    const doubleEndedQueueA = new DoubleEndedQueue();
    expect(doubleEndedQueueA.isEmpty()).toEqual(true);

    const doubleEndedQueueB = new DoubleEndedQueue([1, 2, 3, 4]);
    expect(doubleEndedQueueB.isEmpty()).toEqual(false);
  });

  it('should support removing an item by index', () => {
    expect.assertions(11);

    const doubleEndedQueueA = new DoubleEndedQueue();
    const doubleEndedQueueB = new DoubleEndedQueue();
    const doubleEndedQueueC = new DoubleEndedQueue();

    doubleEndedQueueB.push('foobar');
    doubleEndedQueueB.push('foobaz');

    expect(doubleEndedQueueA.length).toEqual(0);
    // @ts-ignore remove expects a numerical index
    expect(doubleEndedQueueA.remove('foobar')).toEqual(undefined);
    // @ts-ignore remove expects a numerical index
    expect(doubleEndedQueueB.remove(-1, 2)).toEqual('foobaz');
    // @ts-ignore remove expects a numerical index
    expect(doubleEndedQueueB.remove(-4, 0)).toEqual(undefined);
    // @ts-ignore remove expects a numerical index
    expect(doubleEndedQueueB.remove(3, 2)).toEqual(undefined);
    // @ts-ignore remove expects a numerical index
    expect(doubleEndedQueueA.remove({})).toEqual(undefined);
    expect(doubleEndedQueueA.length).toEqual(0);

    expect(doubleEndedQueueC.length).toEqual(0);
    expect(doubleEndedQueueC.remove(1)).toEqual(undefined);
    // @ts-ignore remove expects a numerical index
    expect(doubleEndedQueueC.remove(2, 3)).toEqual(undefined);
    expect(doubleEndedQueueC.length).toEqual(0);
  });

  it('pop should shrink array when mostly empty', () => {
    const doubleEndedQueue = new DoubleEndedQueue();

    for (let i = 0; i < 50000; i++) {
      doubleEndedQueue.push(i);
    }

    // @ts-ignore capacityMask is a private variable
    const maskA = doubleEndedQueue.capacityMask;

    for (let i = 0; i < 35000; i++) {
      doubleEndedQueue.pop();
    }

    // @ts-ignore capacityMask is a private variable
    const maskB = doubleEndedQueue.capacityMask;

    expect(maskA).toBeGreaterThan(maskB);
  });
});
