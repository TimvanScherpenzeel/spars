/**
 * PersistentCache is a simple { key: value } cache that is made persistent using IndexedDB.
 *
 * IndexedDB is promisified by `idb-keyval`, a small abstraction around the IndexedDB API.
 */
export declare class PersistentCache {
    /**
     * Convert ArrayBuffer to Blob
     *
     * @param buffer Buffer to convert
     * @param type MIME type of ArrayBuffer to store
     */
    static convertArrayBufferToBlob: (buffer: ArrayBuffer, type: string) => Blob;
    /**
     * Convert Blob to ArrayBuffer
     *
     * @param blob Blob to convert
     */
    static convertBlobToArrayBuffer: (blob: Blob) => Promise<{}>;
    private memoryCache;
    private store;
    /**
     * Sets various configuration options
     *
     * @param databaseName Name of the persistent cache database
     * @param storeName Name of the persistent cache store
     */
    constructor(databaseName?: string, storeName?: string);
    /**
     * Sets a { key: value } pair in the persistent cache
     *
     * NOTE: In order to store ArrayBuffers in IndexedDB you will need to convert them to Blobs
     * See `PersistentCache.convertArrayBufferToBlob()` and `PersistentCache.convertBlobToArrayBuffer()`
     *
     * @param key Key to set cache entry with
     * @param value Value to set cache entry with
     */
    set(key: IDBValidKey, value: any): void;
    /**
     * Gets a { key: value } pair by key in the persistent cache
     *
     * @param key Key of cache entry to get
     */
    get(key: IDBValidKey): Promise<{}>;
    /**
     * Gets all { key: value } pairs in the persistent cache
     */
    getKeys(): Promise<{}>;
    /**
     * Delete a { key: value } pair by key in the persistent cache
     *
     * @param key Key of cache entry to delete
     */
    delete(key: IDBValidKey): void;
    /**
     * Clear the entire persistent cache from { key: value } pairs
     */
    clear(): void;
}
