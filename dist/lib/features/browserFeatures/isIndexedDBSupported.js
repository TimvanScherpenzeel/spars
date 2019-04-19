"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Tests for IndexedDB support
 */
exports.default = (function () {
    try {
        return !!window.indexedDB;
    }
    catch (err) {
        return false;
    }
})();
//# sourceMappingURL=isIndexedDBSupported.js.map