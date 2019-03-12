// Vendor
import { clear, del, get, keys, set, Store } from 'idb-keyval';

// Logger
import { warn } from '../logger';

/**
 * PersistentCache is a simple { key: value } cache that is persistent using IndexedDB.
 * IndexedDB is promisified by `idb-keyval`, a small abstraction around the IndexedDB API.
 * IndexedDB is intended to be asynchronous but is unfortunately not implemented that way by browser vendors.
 * By moving the database transactions to a webworker some of the latency is avoided.
 */

// A single instance of the IndexedDB cache constructed in a web worker
export class PersistentCache {
  public databaseName: string;
  public storeName: string;

  private store!: Store;

  /**
   * Sets various configuration options
   *
   * @param databaseName Name of the persistent cache database
   * @param storeName Name of the persistent cache store
   */
  constructor(
    databaseName: string = 'ridge-persistent-db',
    storeName: string = 'ridge-persistent-store'
  ) {
    this.databaseName = databaseName;
    this.storeName = storeName;
  }

  /**
   * Sets a { key: value } pair in the persistent cache
   *
   * @param key Key to set cache entry with
   * @param value Value to set cache entry with
   */
  public set(key: string, value: any) {
    set(key, value, this.store).catch(err =>
      warn(`PersistentCache -> Set: { key: ${key}, value: ${value} } has failed with error: ${err}`)
    );
  }

  /**
   * Gets a { key: value } pair by key in the persistent cache
   *
   * @param key Key of cache entry to get
   */
  public get(key: string) {
    return new Promise(resolve => {
      get(key, this.store)
        .then(value => {
          resolve(value);
        })
        .catch(err =>
          warn(`PersistentCache -> Get: { key: ${key} } has failed with error: ${err}`)
        );
    });
  }

  /**
   * Gets all { key: value } pairs in the persistent cache
   */
  public getKeys() {
    return new Promise(resolve => {
      keys(this.store)
        .then(storeKeys => {
          resolve(storeKeys);
        })
        .catch(err =>
          warn(`PersistentCache -> Keys: { key: ${keys} } has failed with error: ${err}`)
        );
    });
  }

  /**
   * Delete a { key: value } pair by key in the persistent cache
   *
   * @param key Key of cache entry to delete
   */
  public delete(key: string) {
    del(key, this.store).catch(err =>
      warn(`PersistentCache -> Delete: { key: ${key} } has failed with error: ${err}`)
    );
  }

  /**
   * Clear the entire persistent cache from { key: value } pairs
   */
  public clear() {
    clear(this.store).catch(err =>
      warn(`PersistentCache -> Clear: Store clearing has failed with error: ${err}`)
    );
  }
}
