"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Tests for LocalStorage support
 */
exports.default = (function () {
    try {
        return !!window.localStorage;
    }
    catch (err) {
        return false;
    }
})();
//# sourceMappingURL=isLocalStorageSupported.js.map