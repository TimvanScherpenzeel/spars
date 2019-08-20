import { TNullable } from '../types';

export class DoublyLinkedList {
  private head: TNullable<IDoublyLinkedListNode> = null;
  private tail: TNullable<IDoublyLinkedListNode> = null;
  private length: number = 0;
}
