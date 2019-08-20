// Types
import { TNullable } from '../../types';

export interface ISinglyLinkedListNode {
  value: () => void;
  next: TNullable<ISinglyLinkedListNode>;
}
