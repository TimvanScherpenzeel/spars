// Types
import { IQueueItem } from './types';

/**
 * A priority queue implementation with a heap implementation containing unique elements
 */
export class PriorityUniqueQueue<T> {
  /**
   * Get the index of the parent
   */
  private static getParentIndex = (childIndex: number): number => Math.floor((childIndex - 1) / 2);

  /**
   * get the left child index
   */
  private static getLeftChildIndex = (parentIndex: number): number => 2 * parentIndex + 1;

  /**
   * Get the right child index
   */
  private static getRightChildIndex = (parentIndex: number): number => 2 * parentIndex + 2;

  /**
   * Check if the child has a parent
   */
  private static hasParent = (childIndex: number): boolean => PriorityUniqueQueue.getParentIndex(childIndex) >= 0;

  private heapContainer: Array<IQueueItem<T>> = [];
  private hashPriority: Record<string, T> = {};

  /**
   * Peek at the heap container head node
   */
  public peek(): any {
    return this.heapContainer[0].value;
  }

  /**
   * Poll the heap container for the next queue item in the heap container
   */
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

  /**
   * Add a queue item to the priority queue
   *
   * @param priority Priority of the queue item
   * @param value Task to store
   */
  public add(priority: number, value: T): void {
    this.heapContainer.push({ priority, value });
    this.pushUp();
    this.hashPriority[priority] = value;
  }

  /**
   * Check if the heap container is empty
   */
  public isEmpty(): boolean {
    return !this.heapContainer.length;
  }

  /**
   * Get a priority slot
   *
   * @param priority Priority slot
   */
  public get(priority: number): any {
    return this.hashPriority[priority];
  }

  /**
   * Move the priority pointer
   */
  public rising(): void {
    const keys = Object.keys(this.hashPriority);

    for (let i = keys.length; i > 0; i--) {
      const key = keys[i - 1];

      this.hashPriority[Number(key) + 1] = this.hashPriority[key];
      delete this.hashPriority[key];
    }

    for (const heap of this.heapContainer) {
      heap.priority++;
    }
  }

  /**
   * Push a queue item up the heap
   */
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

  /**
   * Push a queue item down the heap
   */
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

      if (this.pairIsInCorrectOrder(this.heapContainer[currentIndex], this.heapContainer[nextIndex])) {
        break;
      }

      this.swap(currentIndex, nextIndex);
      currentIndex = nextIndex;
    }
  }

  /**
   * Verify is a pair is ordered correctly
   *
   * @param firstElement First queue item
   * @param secondElement Second queue item
   */
  private pairIsInCorrectOrder(firstElement: IQueueItem<T>, secondElement: IQueueItem<T>): boolean {
    return firstElement.priority >= secondElement.priority;
  }

  /**
   * Swap the pointer to the item in the heap
   *
   * @param indexA First index
   * @param indexB Second index
   */
  private swap(indexA: number, indexB: number): void {
    const tmp = this.heapContainer[indexB];
    this.heapContainer[indexB] = this.heapContainer[indexA];
    this.heapContainer[indexA] = tmp;
  }
}
