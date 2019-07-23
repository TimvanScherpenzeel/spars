// Types
import { TNullable } from '../types';
import { IListNode } from './types';

export class LinkedList {
  private length: number;
  private head: TNullable<IListNode>;
  private last: TNullable<IListNode>;

  constructor() {
    this.head = null;
    this.last = null;
    this.length = 0;
  }

  public push(value: () => void): void {
    const node: IListNode = {
      next: null,
      value,
    };

    if (this.length === 0) {
      this.head = node;
      this.last = node;
    } else {
      (this.last as IListNode).next = node;
      this.last = node;
    }

    this.length++;
  }

  public shift(): any {
    const currentHead = this.head as IListNode;
    const value = currentHead.value;

    this.head = currentHead.next;
    this.length--;

    return value;
  }

  public isEmpty(): boolean {
    return this.length === 0;
  }
}
