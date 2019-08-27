// Source
import { LinkedList, LinkedListNode } from '../../src/dataStructures/LinkedList';

// Constants
import { TEST_CONSTANTS } from '../constants';

const { Ax } = TEST_CONSTANTS;

let linkedList = new LinkedList();

// Suite
describe('LinkedList', () => {
  it('should instantiate a new LinkedList', () => {
    expect.assertions(1);

    linkedList = new LinkedList();

    expect(linkedList).toBeInstanceOf(LinkedList);
  });

  it('should insert a new value at the tail', () => {
    expect.assertions(2);

    const entry = linkedList.insertValue(Ax);

    expect((linkedList.getTail as any).value).toEqual(entry.value);
    expect((linkedList.getTail as any).value).toEqual(Ax);

    linkedList.clear();
  });

  it('should dispose an entry by entry', () => {
    expect.assertions(2);

    const entry = linkedList.insertValue(Ax);

    expect(linkedList.getLength).toEqual(1);

    linkedList.disposeEntry(entry);

    expect(linkedList.getLength).toEqual(0);

    linkedList.clear();
  });

  it('should create a new insertable unlisted entry', () => {
    expect.assertions(1);

    const entry = linkedList.createEntry(Ax);

    linkedList.insertEntry(entry);

    expect(linkedList.getLength).toEqual(1);

    linkedList.clear();
  });
});

let linkedListNode = new LinkedListNode(Ax);

// Suite
describe('LinkedListEntry', () => {
  it('should instantiate a new LinkedListNode', () => {
    expect.assertions(1);

    linkedListNode = new LinkedListNode(Ax);

    expect(linkedListNode).toBeInstanceOf(LinkedListNode);
  });

  it('should set a data on .value property', () => {
    expect.assertions(1);

    expect(linkedListNode.value).toEqual(Ax);
  });
});
