/**
 * Options to pass to the PersistentCache
 */
export interface IPersistentCacheOptions {
  databaseName?: string;
  storeName?: string;
}

/**
 * Key used for getting entries in the LRU cache and linked list
 */
export type TLRUCacheKey = string | number;
