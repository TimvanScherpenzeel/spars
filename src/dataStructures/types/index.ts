// Types
import { TNullable } from '../../types';

export interface IListNode {
  value: () => void;
  next: TNullable<IListNode>;
}
