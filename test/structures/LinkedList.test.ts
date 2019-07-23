// Source
import { LinkedList, LinkedListEntry } from '../../src/structures/LinkedList';

// Constants
import { TEST_CONSTANTS } from '../constants';

const { Ax, Bx } = TEST_CONSTANTS;

let linkedListEntry = new LinkedListEntry(Ax);

// Suite
describe('LinkedListEntry', () => {
  it('should instantiate a new LinkedListEntry', () => {
    expect.assertions(1);

    linkedListEntry = new LinkedListEntry(Ax);

    expect(linkedListEntry).toBeInstanceOf(LinkedListEntry);
  });

  it('should set a data on .value property', () => {
    expect.assertions(1);

    expect(linkedListEntry.value).toEqual(Ax);
  });
});

let linkedList = new LinkedList();

// Suite
describe('LinkedList', () => {
  it('should instantiate a new LinkedList', () => {
    expect.assertions(1);

    linkedList = new LinkedList();

    expect(linkedList).toBeInstanceOf(LinkedList);
  });

  it('should insert a new value at the head', () => {
    expect.assertions(4);

    const firstEntry = linkedList.insertHead(Ax);

    expect(linkedList.getHead && linkedList.getHead.value).toEqual(firstEntry.value);
    expect(linkedList.getHead && linkedList.getHead.value).toEqual(Ax);

    const secondEntry = linkedList.insertHead(Bx);

    expect(linkedList.getHead && linkedList.getHead.value).toEqual(secondEntry.value);
    expect(linkedList.getHead && linkedList.getHead.value).toEqual(Bx);
  });

  it('should remove a value at the head', () => {
    expect.assertions(4);

    const secondEntry = linkedList.deleteHead();

    // @ts-ignore possibly null
    expect(secondEntry.value).toEqual(Bx);

    // @ts-ignore possibly null
    expect(linkedList.getHead.value).toEqual(Ax);

    const firstEntry = linkedList.deleteHead();

    // @ts-ignore possibly null
    expect(firstEntry.value).toEqual(Ax);

    // @ts-ignore possibly null
    expect(linkedList.getHead).toEqual(null);
  });
});
