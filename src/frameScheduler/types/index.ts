// Types
import { TNullable } from '../../types';

/**
 * Instance of a list node
 */
export interface ISinglyLinkedListNode {
  data: () => void;
  next: TNullable<ISinglyLinkedListNode>;
}

/**
 * Item to be processed by the PriorityQueue
 */
export interface IQueueItem<T> {
  priority: number;
  value: T;
}
