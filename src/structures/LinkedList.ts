// Types
import { TNullable } from '../types';

/**
 * Linked list entry
 */
export class LinkedListEntry {
  public value: any;
  public next: TNullable<LinkedListEntry> = null;

  constructor(value: any) {
    this.value = value;
  }
}

/**
 * A simple linked list implementation
 */
// tslint:disable-next-line:max-classes-per-file
export class LinkedList {
  private head: TNullable<LinkedListEntry> = null;
  private tail: TNullable<LinkedListEntry> = null;

  /**
   * Get the head of the list
   */
  get getHead(): TNullable<LinkedListEntry> {
    return this.head;
  }

  /**
   * Insert a new value at the head
   *
   * @param value Value to store in entry
   */
  public insertHead(value: any): LinkedListEntry {
    const entry = new LinkedListEntry(value);
    entry.next = this.head;
    this.head = entry;

    if (!this.tail) {
      this.tail = entry;
    }

    return entry;
  }

  /**
   * Delete and return the head entry
   */
  public deleteHead(): TNullable<LinkedListEntry> {
    if (!this.head) {
      return null;
    }

    const deletedHead = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }
}
