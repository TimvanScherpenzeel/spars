// @ts-check

// Cache
// @ts-ignore: the worker-loader solution of Webpack allows for not having a default export
import PersistentCacheWorker from 'worker!./PersistentCache.worker';

// Config
import { getConfigEntry } from '../config';

// Types
export interface IPersistentCacheOptions {
  databaseName?: string;
  storeName?: string;
}

/**
 * PersistentCache is a simple { key: value } cache that is persistent using IndexedDB.
 * IndexedDB is promisified by a `idb-keyval`, a small abstraction around the IndexedDB API.
 * IndexedDB is intended to be asynchronous but is unfortunately not implemented that way by browser vendors.
 * By moving the database transactions to a webworker some of the latency is avoided.

 * PersistentCacheWorker relies on permissions and availability of inlining webworkers
 * (this avoids shipping a seperate worker file).

 * This is sometimes forbidden due to security restrictions (https://developers.google.com/web/fundamentals/security/csp/)
 * and sometimes not available in very old browsers (https://caniuse.com/#feat=webworkers)
 */

// A single instance of the IndexedDB cache constructed in a web worker
export class PersistentCache {
  public databaseName: string;
  public storeName: string;

  private cache: PersistentCacheWorker;

  /**
   * Sets various configuration options
   *
   * @param {object} options Options: { databaseName, storeName }
   */
  constructor(options: IPersistentCacheOptions = {}) {
    this.databaseName = options.databaseName || 'ridge-persistent-db';
    this.storeName = options.storeName || 'ridge-persistent-store';
    this.cache = new PersistentCacheWorker();
  }

  /**
   * Sets a { key: value } pair in the persistent cache
   *
   * @param {string} key Key
   * @param {any} value Value
   */
  public set(key: string, value: any) {
    this.cache.postMessage({
      databaseName: this.databaseName,
      key,
      logVerbosity: getConfigEntry('LOG_VERBOSITY'),
      storeName: this.storeName,
      type: 'set',
      value,
    });
  }

  /**
   * Gets a { key: value } pair by key in the persistent cache
   *
   * @param {string} key Key
   */
  public get(key: string) {
    return new Promise(resolve => {
      this.cache.postMessage({
        databaseName: this.databaseName,
        key,
        logVerbosity: getConfigEntry('LOG_VERBOSITY'),
        storeName: this.storeName,
        type: 'get',
      });

      this.cache.addEventListener('message', (event: MessageEvent) => {
        if (event.data.type === 'get') {
          resolve(event.data.val);
        }
      });
    });
  }

  /**
   * Gets all { key: value } pairs in the persistent cache
   */
  public getKeys() {
    return new Promise(resolve => {
      this.cache.postMessage({
        databaseName: this.databaseName,
        logVerbosity: getConfigEntry('LOG_VERBOSITY'),
        storeName: this.storeName,
        type: 'keys',
      });

      this.cache.addEventListener('message', (event: MessageEvent) => {
        if (event.data.type === 'keys') {
          resolve(event.data.keys);
        }
      });
    });
  }

  /**
   * Dispose a { key: value } pair by key in the persistent cache
   *
   * @param {string} key Key
   */
  public dispose(key: string) {
    this.cache.postMessage({
      databaseName: this.databaseName,
      key,
      logVerbosity: getConfigEntry('LOG_VERBOSITY'),
      storeName: this.storeName,
      type: 'del',
    });
  }

  /**
   * Clear the entire persistent cache from { key: value } pairs
   */
  public clear() {
    this.cache.postMessage({
      databaseName: this.databaseName,
      logVerbosity: getConfigEntry('LOG_VERBOSITY'),
      storeName: this.storeName,
      type: 'clear',
    });
  }
}
