// Types
import { TUndefinable } from '../types';

export class DoubleEndedQueue {
  private headIndex: number = 0;
  private tailIndex: number = 0;
  private capacityMask: number = 0x3;
  private internalList: any[] = new Array(4);

  /**
   * Fills the queue with items from an array
   *
   * @param array Array with items to fill the internal list with
   */
  public fromArray(array: any[]): void {
    for (const item of array) {
      this.push(item);
    }
  }

  /**
   * Returns the item at the specified index from the internal list
   * You can specify a negative index to peek at values from the end of the internal list
   *
   * @param index Index of the item to peek at
   */
  public peekAtIndex(index: number): TUndefinable<any> {
    const length = this.size();

    if (index >= length || index < -length) {
      return undefined;
    }

    if (index < 0) {
      index += length;
    }

    index = (this.headIndex + index) & this.capacityMask;

    return this.internalList[index];
  }

  /**
   * Returns the head item of the internal list without removing it
   */
  public peekAtHead(): TUndefinable<any> {
    if (this.headIndex === this.tailIndex) {
      return undefined;
    }

    return this.internalList[this.headIndex];
  }

  /**
   * Returns the tail item of the internal list without removing it
   */
  public peekAtTail(): TUndefinable<any> {
    return this.peekAtIndex(-1);
  }

  /**
   * Get the number of items in the internal list
   */
  public size(): number {
    if (this.headIndex === this.tailIndex) {
      return 0;
    }

    if (this.headIndex < this.tailIndex) {
      return this.tailIndex - this.headIndex;
    } else {
      return this.capacityMask + 1 - (this.headIndex - this.tailIndex);
    }
  }

  /**
   * Add an item to the head of the internal list
   *
   * @param item Item to insert
   */
  public insertHead(item: any): TUndefinable<any> {
    const length = this.internalList.length;

    this.headIndex = (this.headIndex - 1 + length) & this.capacityMask;
    this.internalList[this.headIndex] = item;

    if (this.tailIndex === this.headIndex) {
      this.growList();
    }

    if (this.headIndex < this.tailIndex) {
      return this.tailIndex - this.headIndex;
    } else {
      return this.capacityMask + 1 - (this.headIndex - this.tailIndex);
    }
  }

  /**
   * Remove and return the first item on the internal list
   */
  public shift(): TUndefinable<any> {
    const headIndex = this.headIndex;

    if (headIndex === this.tailIndex) {
      return undefined;
    }

    const item = this.internalList[headIndex];
    this.internalList[headIndex] = undefined;
    this.headIndex = (headIndex + 1) & this.capacityMask;

    if (headIndex < 2 && this.tailIndex > 1e4 && this.tailIndex <= this.internalList.length >>> 2) {
      this.shrinkList();
    }

    return item;
  }

  /**
   * Add an item to the tail of the internal list
   *
   * @param item Item to insert
   */
  public push(item: any): number {
    const tailIndex = this.tailIndex;

    this.internalList[tailIndex] = item;

    this.tailIndex = (tailIndex + 1) & this.capacityMask;

    if (this.tailIndex === this.headIndex) {
      this.growList();
    }

    if (this.headIndex < this.tailIndex) {
      return this.tailIndex - this.headIndex;
    } else {
      return this.capacityMask + 1 - (this.headIndex - this.tailIndex);
    }
  }

  /**
   * Remove and return the last item on the internal list
   */
  public pop(): any {
    const tailIndex = this.tailIndex;

    if (tailIndex === this.headIndex) {
      return undefined;
    }

    const length = this.internalList.length;

    this.tailIndex = (tailIndex - 1 + length) & this.capacityMask;

    const item = this.internalList[this.tailIndex];

    this.internalList[this.tailIndex] = undefined;

    if (this.headIndex < 2 && tailIndex > 1e4 && tailIndex <= length >>> 2) {
      this.shrinkList();
    }

    return item;
  }

  /**
   * Remove and return the item at the specified index from the internal list
   *
   * @param index
   */
  public remove(index: number): TUndefinable<any> {
    if (this.isEmpty()) {
      return undefined;
    }

    const size = this.size();
    const length = this.internalList.length;

    if (index >= size || index < -size) {
      return undefined;
    }

    if (index < 0) {
      index += size;
    }

    index = (this.headIndex + index) & this.capacityMask;

    const item = this.internalList[index];

    let i;

    if (index < size / 2) {
      for (i = index; i > 0; i--) {
        this.internalList[index] = this.internalList[
          (index = (index - 1 + length) & this.capacityMask)
        ];
      }

      this.internalList[index] = undefined;

      this.headIndex = (this.headIndex + 1 + length) & this.capacityMask;
    } else {
      for (i = size - 1 - index; i > 0; i--) {
        this.internalList[index] = this.internalList[
          (index = (index + 1 + length) & this.capacityMask)
        ];
      }

      this.internalList[index] = undefined;
      this.tailIndex = (this.tailIndex - 1 + length) & this.capacityMask;
    }

    return item;
  }

  /**
   * Check if the internal list is empty
   */
  public isEmpty(): boolean {
    return this.headIndex === this.tailIndex;
  }

  /**
   * Get the internal list as array
   */
  public toArray(): any[] {
    return this.copyList(false);
  }

  /**
   * Double the length of the internal list
   */
  private growList(): void {
    if (this.headIndex) {
      this.internalList = this.copyList(true);
      this.headIndex = 0;
    }

    this.tailIndex = this.internalList.length;

    this.internalList.length *= 2;

    this.capacityMask = (this.capacityMask << 1) | 1;
  }

  /**
   * Copy the internal list to a new list
   *
   * @param shouldDoFullCopy Should it do a full copy
   */
  private copyList(shouldDoFullCopy: boolean): any[] {
    const tmp = [];
    const tmpList = this.internalList;
    const length = tmpList.length;

    let i;

    if (shouldDoFullCopy || this.headIndex > this.tailIndex) {
      for (i = this.headIndex; i < length; i++) {
        tmp.push(tmpList[i]);
      }

      for (i = 0; i < this.tailIndex; i++) {
        tmp.push(tmpList[i]);
      }
    } else {
      for (i = this.headIndex; i < this.tailIndex; i++) {
        tmp.push(tmpList[i]);
      }
    }

    return tmp;
  }

  /**
   * Shrink the internal list
   */
  private shrinkList(): void {
    this.internalList.length >>>= 1;
    this.capacityMask >>>= 1;
  }
}
