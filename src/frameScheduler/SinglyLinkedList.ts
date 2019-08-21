// Types
import { TNullable } from '../types';
import { ISinglyLinkedListNode } from './types';

/**
 * A simple and efficient singly linked list implementation (FIFO)
 *
 * [A-HEAD] <- [B] <- [C] <- [D] <- [E-TAIL]
 *
 * Where push appends to [E-TAIL] and shift removes the head node [A-HEAD]
 */
export class SinglyLinkedList {
  private head: TNullable<ISinglyLinkedListNode> = null;
  private tail: TNullable<ISinglyLinkedListNode> = null;
  private length: number = 0;

  /**
   * Push a list node at the tail of the linked list
   *
   * @param data Data to add to the list node
   */
  public push(data: () => void): void /* -> O(1) */ {
    const node: ISinglyLinkedListNode = {
      data,
      next: null,
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
    const data = currentHead.data;

    this.head = currentHead.next;
    this.length--;

    return data;
  }

  /**
   * Check if the linked list has no link nodes
   */
  public isEmpty(): boolean /* -> O(1) */ {
    return this.length === 0;
  }
}
