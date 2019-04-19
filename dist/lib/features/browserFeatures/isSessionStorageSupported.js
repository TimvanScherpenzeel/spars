"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Tests for SessionStorage support
 */
exports.default = (function () {
    try {
        return !!window.sessionStorage;
    }
    catch (err) {
        return false;
    }
})();
//# sourceMappingURL=isSessionStorageSupported.js.map