// Types
import { IQueueItem } from './types';

export class PriorityUniqueQueue<T> {
  private static getParentIndex = (childIndex: number): number => Math.floor((childIndex - 1) / 2);
  private static getRightChildIndex = (parentIndex: number): number => 2 * parentIndex + 2;
  private static hasParent = (childIndex: number): boolean =>
    PriorityUniqueQueue.getParentIndex(childIndex) >= 0;
  private static getLeftChildIndex = (parentIndex: number): number => 2 * parentIndex + 1;

  private heapContainer: Array<IQueueItem<T>> = [];
  private hashPriority: Record<string, T> = {};

  public peek(): any {
    return this.heapContainer[0].value;
  }

  public poll(): any {
    let item;

    if (this.heapContainer.length === 1) {
      item = this.heapContainer.pop() as IQueueItem<T>;
    } else {
      item = this.heapContainer[0];

      this.heapContainer[0] = this.heapContainer.pop() as IQueueItem<T>;

      this.pushDown();
    }

    delete this.hashPriority[item.priority];

    return item.value;
  }

  public add(priority: number, value: T): void {
    this.heapContainer.push({ priority, value });
    this.pushUp();
    this.hashPriority[priority] = value;
  }

  public isEmpty(): boolean {
    return !this.heapContainer.length;
  }

  public get(priority: number): any {
    return this.hashPriority[priority];
  }

  public rising(): void {
    const keys = Object.keys(this.hashPriority);

    for (let i = keys.length; i > 0; i--) {
      const key = keys[i - 1];

      this.hashPriority[Number(key) + 1] = this.hashPriority[key];
      delete this.hashPriority[key];
    }

    for (const heap of this.heapContainer) {
      heap.priority += 1;
    }
  }

  private pushUp(): void {
    let currentIndex = this.heapContainer.length - 1;

    while (
      PriorityUniqueQueue.hasParent(currentIndex) &&
      !this.pairIsInCorrectOrder(
        this.heapContainer[PriorityUniqueQueue.getParentIndex(currentIndex)],
        this.heapContainer[currentIndex]
      )
    ) {
      this.swap(currentIndex, PriorityUniqueQueue.getParentIndex(currentIndex));
      currentIndex = PriorityUniqueQueue.getParentIndex(currentIndex);
    }
  }

  private pushDown(): void {
    let currentIndex = 0;
    let nextIndex = null;

    while (PriorityUniqueQueue.getLeftChildIndex(currentIndex) < this.heapContainer.length) {
      if (
        PriorityUniqueQueue.getRightChildIndex(currentIndex) < this.heapContainer.length &&
        this.pairIsInCorrectOrder(
          this.heapContainer[PriorityUniqueQueue.getRightChildIndex(currentIndex)],
          this.heapContainer[PriorityUniqueQueue.getLeftChildIndex(currentIndex)]
        )
      ) {
        nextIndex = PriorityUniqueQueue.getRightChildIndex(currentIndex);
      } else {
        nextIndex = PriorityUniqueQueue.getLeftChildIndex(currentIndex);
      }

      if (
        this.pairIsInCorrectOrder(this.heapContainer[currentIndex], this.heapContainer[nextIndex])
      ) {
        break;
      }

      this.swap(currentIndex, nextIndex);
      currentIndex = nextIndex;
    }
  }

  private pairIsInCorrectOrder(firstElement: IQueueItem<T>, secondElement: IQueueItem<T>): boolean {
    return firstElement.priority >= secondElement.priority;
  }

  private swap(indexA: number, indexB: number): void {
    const tmp = this.heapContainer[indexB];
    this.heapContainer[indexB] = this.heapContainer[indexA];
    this.heapContainer[indexA] = tmp;
  }
}
