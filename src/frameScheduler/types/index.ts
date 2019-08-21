// Types
import { TNullable } from '../../types';

export interface ISinglyLinkedListNode {
  data: () => void;
  next: TNullable<ISinglyLinkedListNode>;
}

export interface IQueueItem<T> {
  priority: number;
  value: T;
}
