// Types
import { TNullable } from '../types';
import { IListNode } from './types';

/**
 * A simple and efficient linked list implementation
 */
export class LinkedList {
  private length: number = 0;
  private head: TNullable<IListNode> = null;
  private last: TNullable<IListNode> = null;

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
      this.last = node;
    } else {
      (this.last as IListNode).next = node;
      this.last = node;
    }

    this.length++;
  }

  /**
   * Shift a list node off of the start of the linked list
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
