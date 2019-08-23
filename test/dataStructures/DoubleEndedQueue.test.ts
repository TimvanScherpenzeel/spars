// Source
import { Deque } from '../../src/dataStructures/Deque';

describe('Deque', () => {
  it('should take no argument', () => {
    expect.assertions(1);

    const deque = new Deque();

    expect(deque.length).toStrictEqual(0);
  });

  it('should take an array argument', () => {
    expect.assertions(4);

    const A = [1, 2, 3, 4];
    const dequeA = new Deque(A);

    expect(dequeA.length).toBeGreaterThanOrEqual(A.length);
    expect(dequeA.toArray()).toEqual(A);

    const B: any[] = [];
    const dequeB = new Deque([]);

    expect(dequeB.length).toBeGreaterThanOrEqual(B.length);
    expect(dequeB.toArray()).toEqual(B);
  });

  it('should handle high volume traffic', () => {
    expect.assertions(0);

    const deque = new Deque();
    let A = 2500000;

    while (--A) {
      deque.push(A);
      deque.unshift(A);
    }

    let B = 2500000;

    while (--B) {
      const itemB = deque.shift();
      deque.pop();
      deque.shift();
      deque.push(itemB);
      deque.shift();
      deque.shift();
    }
  });

  it('should add a single item with plenty of capacity left', () => {
    expect.assertions(5);

    const deque = new Deque([1, 2, 3, 4, 5]);

    // @ts-ignore internalList is a private variable
    expect(deque.internalList.length - deque.length).toBeGreaterThan(1);
    const beforeInsertion = deque.length;
    const itemIndex = deque.unshift('A');

    expect(itemIndex).toStrictEqual(beforeInsertion + 1);
    expect(deque.length).toStrictEqual(itemIndex);
    expect(itemIndex).toStrictEqual(6);
    expect(deque.toArray()).toEqual(['A', 1, 2, 3, 4, 5]);
  });

  it('should add a single item with over capacity', () => {
    expect.assertions(5);

    // prettier-ignore
    const deque = new Deque([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);

    // @ts-ignore internalList is a private variable
    expect(deque.internalList.length / deque.length).toEqual(2);
    const beforeInsertion = deque.length;
    const itemIndex = deque.unshift('A');

    expect(itemIndex).toStrictEqual(beforeInsertion + 1);
    expect(deque.length).toStrictEqual(itemIndex);
    expect(itemIndex).toStrictEqual(17);
    // prettier-ignore
    expect(deque.toArray()).toEqual(['A', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
  });

  it('should return the item at the back of the queue', () => {
    expect.assertions(8);

    const A: any[] = [];
    const dequeA = new Deque(A);

    expect(dequeA.length).toEqual(0);
    expect(dequeA.pop()).toEqual(undefined);
    expect(dequeA.pop()).toEqual(undefined);
    expect(dequeA.length).toEqual(0);

    const B = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const dequeB = new Deque(B);

    expect(dequeB.pop()).toEqual(9);
    expect(dequeB.pop()).toEqual(8);
    B.pop();
    B.pop();

    expect(dequeB.toArray()).toEqual(B);

    dequeB.unshift(5);
    dequeB.unshift(4);
    dequeB.unshift(3);
    dequeB.unshift(2);
    dequeB.unshift(1);

    dequeB.push(1);
    dequeB.push(2);
    dequeB.push(3);
    dequeB.push(4);
    dequeB.push(5);

    dequeB.unshift(3);
    dequeB.unshift(2);
    dequeB.unshift(1);

    dequeB.pop();

    B.unshift(1, 2, 3, 4, 5);
    B.push(1, 2, 3, 4, 5);
    B.unshift(1, 2, 3);

    B.pop();

    expect(dequeB.toArray()).toEqual(B);
  });

  it('should return the item at the front of the queue', () => {
    expect.assertions(11);

    const A = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const dequeA = new Deque(A);

    expect(dequeA.shift()).toEqual(1);
    expect(dequeA.shift()).toEqual(2);

    A.shift();
    A.shift();

    expect(dequeA.toArray()).toEqual(A);

    dequeA.unshift(5);
    dequeA.unshift(4);
    dequeA.unshift(3);
    dequeA.unshift(2);
    dequeA.unshift(1);

    dequeA.push(1);
    dequeA.push(2);
    dequeA.push(3);
    dequeA.push(4);
    dequeA.push(5);

    dequeA.unshift(3);
    dequeA.unshift(2);
    dequeA.unshift(1);

    dequeA.shift();

    A.unshift(1, 2, 3, 4, 5);
    A.push(1, 2, 3, 4, 5);
    A.unshift(1, 2, 3);
    A.shift();

    expect(dequeA.toArray()).toEqual(A);

    expect(dequeA.shift()).toEqual(A.shift());

    expect(dequeA.toArray()).toEqual(A);

    const dequeB = new Deque([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(dequeB.peekHead()).toEqual(1);
    expect(dequeB.peekTail()).toEqual(9);

    let length = 5;

    while (length--) {
      dequeB.pop();
    }

    expect(dequeB.toArray()).toEqual([1, 2, 3, 4]);
    expect(dequeB.peekHead()).toEqual(1);
    expect(dequeB.peekTail()).toEqual(4);
  });

  it('should return undefined on nonsencial argument', () => {
    expect.assertions(14);

    const dequeA = new Deque([1, 2, 3, 4]);

    expect(dequeA.peekIndex(-5)).toEqual(undefined);
    expect(dequeA.peekIndex(-100)).toEqual(undefined);
    // @ts-ignore peekIndex expects numerical values
    expect(dequeA.peekIndex(undefined)).toEqual(undefined);
    // @ts-ignore peekIndex expects numerical values
    expect(dequeA.peekIndex('1')).toEqual(undefined);
    expect(dequeA.peekIndex(NaN)).toEqual(undefined);
    expect(dequeA.peekIndex(Infinity)).toEqual(undefined);
    expect(dequeA.peekIndex(-Infinity)).toEqual(undefined);
    expect(dequeA.peekIndex(1.5)).toEqual(undefined);
    expect(dequeA.peekIndex(4)).toEqual(undefined);

    const dequeB = new Deque();

    expect(dequeB.length).toEqual(0);
    expect(dequeB.peekHead()).toEqual(undefined);
    expect(dequeB.peekHead()).toEqual(undefined);
    expect(dequeB.peekTail()).toEqual(undefined);
    expect(dequeB.peekTail()).toEqual(undefined);
  });

  it('should support positive indexing', () => {
    expect.assertions(4);

    const deque = new Deque([1, 2, 3, 4]);

    expect(deque.peekIndex(0)).toEqual(1);
    expect(deque.peekIndex(1)).toEqual(2);
    expect(deque.peekIndex(2)).toEqual(3);
    expect(deque.peekIndex(3)).toEqual(4);
  });

  it('should support negative indexing', () => {
    expect.assertions(4);

    const deque = new Deque([1, 2, 3, 4]);

    expect(deque.peekIndex(-1)).toEqual(4);
    expect(deque.peekIndex(-2)).toEqual(3);
    expect(deque.peekIndex(-3)).toEqual(2);
    expect(deque.peekIndex(-4)).toEqual(1);
  });

  it('should return true on empty queue', () => {
    expect.assertions(2);

    const dequeA = new Deque();
    expect(dequeA.isEmpty()).toEqual(true);

    const dequeB = new Deque([1, 2, 3, 4]);
    expect(dequeB.isEmpty()).toEqual(false);
  });

  it('should support removing an item by index', () => {
    expect.assertions(11);

    const dequeA = new Deque();
    const dequeB = new Deque();
    const dequeC = new Deque();

    dequeB.push('foobar');
    dequeB.push('foobaz');

    expect(dequeA.length).toEqual(0);
    // @ts-ignore remove expects a numerical index
    expect(dequeA.remove('foobar')).toEqual(undefined);
    // @ts-ignore remove expects a numerical index
    expect(dequeB.remove(-1, 2)).toEqual('foobaz');
    // @ts-ignore remove expects a numerical index
    expect(dequeB.remove(-4, 0)).toEqual(undefined);
    // @ts-ignore remove expects a numerical index
    expect(dequeB.remove(3, 2)).toEqual(undefined);
    // @ts-ignore remove expects a numerical index
    expect(dequeA.remove({})).toEqual(undefined);
    expect(dequeA.length).toEqual(0);

    expect(dequeC.length).toEqual(0);
    expect(dequeC.remove(1)).toEqual(undefined);
    // @ts-ignore remove expects a numerical index
    expect(dequeC.remove(2, 3)).toEqual(undefined);
    expect(dequeC.length).toEqual(0);
  });

  it('pop should shrink array when mostly empty', () => {
    const deque = new Deque();

    for (let i = 0; i < 50000; i++) {
      deque.push(i);
    }

    // @ts-ignore capacityMask is a private variable
    const maskA = deque.capacityMask;

    for (let i = 0; i < 35000; i++) {
      deque.pop();
    }

    // @ts-ignore capacityMask is a private variable
    const maskB = deque.capacityMask;

    expect(maskA).toBeGreaterThan(maskB);
  });
});
