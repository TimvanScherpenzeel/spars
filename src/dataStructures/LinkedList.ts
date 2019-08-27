// Types
import { TNullable } from '../types';
import { TLRUCacheKey } from './types';

/**
 * Linked list node
 */
export class LinkedListNode {
  public value: any;
  public next: TNullable<LinkedListNode> = null;
  public previous: TNullable<LinkedListNode> = null;
  public key!: TLRUCacheKey;

  constructor(value: any) {
    this.value = value;
  }
}

/**
 * A simple linked list implementation
 */
// tslint:disable-next-line:max-classes-per-file
export class LinkedList {
  private head: TNullable<LinkedListNode> = null;
  private tail: TNullable<LinkedListNode> = null;
  private length: number = 0;

  /**
   * Get the head of the list
   */
  get getHead(): TNullable<LinkedListNode> {
    return this.head;
  }

  /**
   * Get the tail of the list
   */
  get getTail(): TNullable<LinkedListNode> {
    return this.tail;
  }

  /**
   * Get the current length of the list
   */
  get getLength(): number {
    return this.length;
  }

  /**
   * Insert a new value at the tail
   *
   * @param value Value to insert at tail
   */
  public insertValue(value: any): LinkedListNode {
    const node = new LinkedListNode(value);
    this.insertEntry(node);

    return node;
  }

  /**
   * Insert a node at the tail
   *
   * @param node Entry to insert at tail
   */
  public insertEntry(node: LinkedListNode): void {
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      if (this.tail) {
        this.tail.next = node;
      }

      node.previous = this.tail;
      this.tail = node;
    }

    this.length++;
  }

  /**
   * Dispose a node
   *
   * @param node Entry to dispose
   */
  public disposeEntry = (node: LinkedListNode): void => {
    const previous = node.previous;
    const next = node.next;

    if (previous) {
      previous.next = next;
    } else {
      this.head = next;
    }

    if (next) {
      next.previous = previous;
    } else {
      this.tail = previous;
    }

    node.next = node.previous = null;

    this.length--;
  };

  /**
   * Clear the list
   */
  public clear(): void {
    this.tail = this.head = null;
    this.length = 0;
  }
}
