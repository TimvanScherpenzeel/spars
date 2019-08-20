// Types
import { TNullable } from '../types';
import { IDoublyLinkedListNode } from './types';

// TODO: implement methods (shift, pop, simplified forEach or other way of iterating over all nodes)
// TODO: rename push method to append / prepend

/**
 * A simple and efficient circular doubly linked list implementation (FIFO | LIFO)
 *
 * [A-HEAD] <- [B] <- [C] <- [D] <- [E-TAIL] <- [A-HEAD]
 * [A-HEAD] -> [B] -> [C] -> [D] -> [E-TAIL] -> [A-HEAD]
 *
 * Where push appends to [E-TAIL] and shift removes the head node [A-HEAD]
 */
export class DoublyLinkedList {
  private head: TNullable<IDoublyLinkedListNode> = null;
  private tail: TNullable<IDoublyLinkedListNode> = null;
  private length: number = 0;

  /**
   * Get the head of the list
   */
  get getHead(): TNullable<IDoublyLinkedListNode> /* -> O(1) */ {
    return this.head;
  }

  /**
   * Get the tail of the list
   */
  get getTail(): TNullable<IDoublyLinkedListNode> /* -> O(1) */ {
    return this.tail;
  }

  /**
   * Get length of the list
   */
  get getLength(): number /* -> O(1) */ {
    return this.length;
  }

  /**
   * Push a list node at the tail of the linked list
   *
   * @param value Value to add to the list node
   */
  public push(value: () => void): void /* -> O(1) */ {
    const node: IDoublyLinkedListNode = {
      next: null,
      previous: null,
      value,
    };
  }

  /**
   * Shift a list node off of the head of the linked list
   */
  public shift(): any /* -> O(1) */ {}

  /**
   * Pop a list node off of the tail of the linked list
   */
  public pop(): any /* -> O(1) */ {}

  /**
   * Check if the linked list has no link nodes
   */
  public isEmpty(): boolean /* -> O(1) */ {
    return this.length === 0;
  }
}
