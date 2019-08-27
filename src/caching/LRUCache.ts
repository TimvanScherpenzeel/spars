// Data structures
import { LinkedList, LinkedListNode } from '../dataStructures/LinkedList';

// Types
import { TLRUCacheKey } from './types';

/**
 * A simple LRU cache implementation
 */
export class LRUCache {
  public maxSize: number;

  private list: LinkedList;
  private cache: Map<TLRUCacheKey, any> = new Map();

  /**
   * Creates a new LRU cache
   *
   * @param maxSize Least-recently-used cache size
   */
  constructor(maxSize: number = 10) {
    this.list = new LinkedList();
    this.maxSize = maxSize;
  }

  /**
   * Get entire list (internal)
   *
   * @ignore
   */
  get getList(): LinkedList {
    return this.list;
  }

  /**
   * Get entire cache (internal)
   *
   * @ignore
   */
  get getCache(): Map<TLRUCacheKey, any> {
    return this.cache;
  }

  /**
   * Set entry in cache
   *
   * @param key Key of entry to set
   * @param value Value of entry to set
   * @param callback Callback to call upon the deletion of an entry
   */
  public setEntry(
    key: TLRUCacheKey,
    value: any,
    callback?: (disposedEntry: LinkedListNode) => void
  ): void {
    if (!this.cache.get(key) !== undefined) {
      const length = this.list.getLength;

      if (length >= this.maxSize && length > 0) {
        const leastUsedEntry = this.list.getHead;

        if (leastUsedEntry) {
          this.list.disposeEntry(leastUsedEntry);
          this.cache.delete(leastUsedEntry.key);

          if (callback) {
            callback(leastUsedEntry.value);
          }
        }
      }

      const entry = this.list.insertValue(value);
      entry.key = key;
      this.cache.set(key, entry);
    }
  }

  /**
   * Get entry from cache
   *
   * @param key Key of entry to get
   */
  public getEntry(key: TLRUCacheKey): any {
    const entry = this.cache.get(key);

    // Put the latest used entry in the tail
    if (entry !== undefined) {
      if (entry !== this.list.getTail) {
        this.list.disposeEntry(entry);
        this.list.insertEntry(entry);
      }

      return entry.value;
    }
  }

  /**
   * Dispose entry from cache
   *
   * @param key Key of entry to dispose
   */
  public disposeEntry(key: TLRUCacheKey): void {
    const entry = this.cache.get(key);

    if (entry !== undefined) {
      this.cache.delete(key);
      this.list.disposeEntry(entry);
    }
  }

  /**
   * Clear the cache
   */
  public clear(): void {
    this.list.clear();
    this.cache.clear();
  }
}
