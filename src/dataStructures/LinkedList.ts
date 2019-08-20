// Types
import { TNullable } from '../types';
import { IListNode } from './types';

// TODO: add a complete LinkedList implementation (append, prepend, shift, pop, forEach, isEmpty)
// https://github.com/trekhleb/javascript-algorithms/blob/master/src/data-structures/linked-list/LinkedList.js

/**
 * A simple and efficient linked list implementation
 */
export class LinkedList {
  private length: number = 0;
  private head: TNullable<IListNode> = null;
  private tail: TNullable<IListNode> = null;

  /**
   * Push a list node at the tail of the linked list
   *
   * @param value Value to add to the list node
   */
  public push(value: () => void): void {
    const node: IListNode = {
      next: null,
      value,
    };

    if (this.length === 0) {
      this.head = node;
      this.tail = node;
    } else {
      (this.tail as IListNode).next = node;
      this.tail = node;
    }

    this.length++;
  }

  /**
   * Shift a list node off of the head of the linked list
   */
  public shift(): any {
    const currentHead = this.head as IListNode;
    const value = currentHead.value;

    this.head = currentHead.next;
    this.length--;

    return value;
  }

  /**
   * Check if the linked list has no link nodes
   */
  public isEmpty(): boolean {
    return this.length === 0;
  }
}
