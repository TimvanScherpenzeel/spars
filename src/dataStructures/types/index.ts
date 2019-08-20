// Types
import { TNullable } from '../../types';

export interface ISinglyLinkedListNode {
  value: () => void;
  next: TNullable<ISinglyLinkedListNode>;
}

export interface IDoublyLinkedListNode {
  value: () => void;
  previous: TNullable<IDoublyLinkedListNode>;
  next: TNullable<IDoublyLinkedListNode>;
}
