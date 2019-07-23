// Types
import { TNullable } from '../../types';

export interface IListNode {
  value: () => void;
  next: TNullable<IListNode>;
}

export interface IQueueItem<T> {
  priority: number;
  value: T;
}
