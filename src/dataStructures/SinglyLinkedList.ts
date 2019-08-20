// Types
import { TNullable } from '../types';
import { ISinglyLinkedListNode } from './types';

/**
 * A simple and efficient circular singly linked list implementation (FIFO)
 *
 * [A-HEAD] <- [B] <- [C] <- [D] <- [E-TAIL] where push appends to [E-TAIL] and shift removes the head node [A-HEAD]
 */
export class SinglyLinkedList {
  private head: TNullable<ISinglyLinkedListNode> = null;
  private tail: TNullable<ISinglyLinkedListNode> = null;
  private length: number = 0;

  /**
   * Get the head of the list
   */
  get getHead(): TNullable<ISinglyLinkedListNode> {
    return this.head;
  }

  /**
   * Get the tail of the list
   */
  get getTail(): TNullable<ISinglyLinkedListNode> {
    return this.tail;
  }

  /**
   * Get length of the list
   */
  get getLength(): number {
    return this.length;
  }

  /**
   * Push a list node at the tail of the linked list
   *
   * @param value Value to add to the list node
   */
  public push(value: () => void): void /* -> O(1) */ {
    const node: ISinglyLinkedListNode = {
      next: null,
      value,
    };

    if (this.length === 0) {
      this.head = node;
      this.tail = node;
    } else {
      (this.tail as ISinglyLinkedListNode).next = node;
      this.tail = node;
    }

    this.length++;
  }

  /**
   * Shift a list node off of the head of the linked list
   */
  public shift(): any /* -> O(1) */ {
    const currentHead = this.head as ISinglyLinkedListNode;
    const value = currentHead.value;

    this.head = currentHead.next;
    this.length--;

    return value;
  }

  /**
   * Check if the linked list has no link nodes
   */
  public isEmpty(): boolean /* -> O(1) */ {
    return this.length === 0;
  }
}
