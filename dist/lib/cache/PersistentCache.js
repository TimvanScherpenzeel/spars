"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Vendor
var idb_keyval_1 = require("idb-keyval");
// Utilities
var assert_1 = require("../utilities/assert");
/**
 * Check if key is allowed to be stored in IndexedDB
 *
 * @param key Key to validate
 */
var isAllowedAsKey = function (key) {
    if (typeof key === 'number' || typeof key === 'string') {
        return true;
    }
    if (key === 'object' && key) {
        if (Array.isArray(key) ||
            'setUTCFullYear' in key ||
            (typeof ArrayBuffer === 'function' && ArrayBuffer.isView(key)) ||
            ('byteLength' in key && 'length' in key)) {
            return true;
        }
    }
    return false;
};
/**
 * PersistentCache is a simple { key: value } cache that is made persistent using IndexedDB.
 *
 * IndexedDB is promisified by `idb-keyval`, a small abstraction around the IndexedDB API.
 */
var PersistentCache = /** @class */ (function () {
    /**
     * Sets various configuration options
     *
     * @param databaseName Name of the persistent cache database
     * @param storeName Name of the persistent cache store
     */
    function PersistentCache(databaseName, storeName) {
        if (databaseName === void 0) { databaseName = 'persistent-cache-db'; }
        if (storeName === void 0) { storeName = 'persistent-cache-store'; }
        // Back persistent cache with in-memory cache in order to maintain functionality
        // in case IndexedDB is not available (private browsing mode)
        this.memoryCache = new Map();
        this.store = new idb_keyval_1.Store(databaseName, storeName);
    }
    /**
     * Sets a { key: value } pair in the persistent cache
     *
     * NOTE: In order to store ArrayBuffers in IndexedDB you will need to convert them to Blobs
     * See `utilities/convertArrayBufferToBlob.ts` and `utilities/convertBlobToArrayBuffer.ts`
     *
     * @param key Key to set cache entry with
     * @param value Value to set cache entry with
     */
    PersistentCache.prototype.set = function (key, value) {
        var _this = this;
        assert_1.assert(isAllowedAsKey(key), 'PersistentCache -> The given type of key is not allowed');
        idb_keyval_1.set(key, value, this.store).catch(function (err) {
            console.warn("PersistentCache -> Set: { key: " + key + ", value: " + value + " } has failed with error: " + err);
            _this.memoryCache.set(key, value);
        });
    };
    /**
     * Gets a { key: value } pair by key in the persistent cache
     *
     * @param key Key of cache entry to get
     */
    PersistentCache.prototype.get = function (key) {
        var _this = this;
        assert_1.assert(isAllowedAsKey(key), 'PersistentCache -> The given type of key is not allowed');
        return new Promise(function (resolve) {
            idb_keyval_1.get(key, _this.store)
                .then(function (value) {
                resolve(value);
            })
                .catch(function (err) {
                console.warn("PersistentCache -> Get: { key: " + key + " } has failed with error: " + err);
                _this.memoryCache.get(key);
            });
        });
    };
    /**
     * Gets all { key: value } pairs in the persistent cache
     */
    PersistentCache.prototype.getKeys = function () {
        var _this = this;
        return new Promise(function (resolve) {
            idb_keyval_1.keys(_this.store)
                .then(function (storeKeys) {
                resolve(storeKeys);
            })
                .catch(function (err) {
                console.warn("PersistentCache -> Keys: { key: " + idb_keyval_1.keys + " } has failed with error: " + err);
                _this.memoryCache.keys();
            });
        });
    };
    /**
     * Delete a { key: value } pair by key in the persistent cache
     *
     * @param key Key of cache entry to delete
     */
    PersistentCache.prototype.delete = function (key) {
        var _this = this;
        assert_1.assert(isAllowedAsKey(key), 'PersistentCache -> The given type of key is not allowed');
        idb_keyval_1.del(key, this.store).catch(function (err) {
            console.warn("PersistentCache -> Delete: { key: " + key + " } has failed with error: " + err);
            _this.memoryCache.delete(key);
        });
    };
    /**
     * Clear the entire persistent cache from { key: value } pairs
     */
    PersistentCache.prototype.clear = function () {
        var _this = this;
        idb_keyval_1.clear(this.store).catch(function (err) {
            console.warn("PersistentCache -> Clear: Store clearing has failed with error: " + err);
            _this.memoryCache.clear();
        });
    };
    return PersistentCache;
}());
exports.PersistentCache = PersistentCache;
//# sourceMappingURL=PersistentCache.js.map