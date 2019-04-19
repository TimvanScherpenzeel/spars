"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Tests for UserActivation support
 */
exports.default = (function () {
    try {
        // @ts-ignore: missing type definition
        return !!navigator.userActivation;
    }
    catch (err) {
        return false;
    }
})();
//# sourceMappingURL=isUserActivationSupported.js.map