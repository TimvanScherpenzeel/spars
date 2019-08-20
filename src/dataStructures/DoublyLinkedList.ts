// Types
import { TNullable } from '../types';
import { IDoublyLinkedListNode } from './types';

/**
 * A simple and efficient circular doubly linked list implementation (FIFO / LIFO)
 *
 * [A-HEAD] <- [B] <- [C] <- [D] <- [E-TAIL] where push appends to [E-TAIL] and shift removes the head node [A-HEAD]
 *          ->     ->     ->     ->
 */
export class DoublyLinkedList {
  private head: TNullable<IDoublyLinkedListNode> = null;
  private tail: TNullable<IDoublyLinkedListNode> = null;
  private length: number = 0;

  /**
   * Get the head of the list
   */
  get getHead(): TNullable<IDoublyLinkedListNode> {
    return this.head;
  }

  /**
   * Get the tail of the list
   */
  get getTail(): TNullable<IDoublyLinkedListNode> {
    return this.tail;
  }

  /**
   * Get length of the list
   */
  get getLength(): number {
    return this.length;
  }
}
