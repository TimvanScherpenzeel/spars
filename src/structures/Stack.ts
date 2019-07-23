// Internal
import { LinkedList, LinkedListEntry } from './LinkedList';

// Types
import { TNullable } from '../types';

export class Stack {
  private list: LinkedList;

  constructor() {
    this.list = new LinkedList();
  }

  /**
   * Get entire list (internal)
   *
   * @ignore
   */
  get getList(): LinkedList {
    return this.list;
  }

  public push(value: any): void {
    this.list.insertHead(value);
  }

  public pop(): TNullable<LinkedListEntry> {
    return this.list.deleteHead();
  }
}
