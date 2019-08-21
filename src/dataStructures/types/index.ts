// Types
import { TNullable } from '../../types';

export interface ISinglyLinkedListNode {
  data: () => void;
  next: TNullable<ISinglyLinkedListNode>;
}

export interface IDoublyLinkedListNode {
  data: () => void;
  next: TNullable<IDoublyLinkedListNode>;
  previous: TNullable<IDoublyLinkedListNode>;
}
