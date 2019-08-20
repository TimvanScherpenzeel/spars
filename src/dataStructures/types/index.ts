// Types
import { TNullable } from '../../types';

export interface ISinglyLinkedListNode {
  next: TNullable<ISinglyLinkedListNode>;
  value: () => void;
}

export interface IDoublyLinkedListNode {
  next: TNullable<IDoublyLinkedListNode>;
  previous: TNullable<IDoublyLinkedListNode>;
  value: () => void;
}
