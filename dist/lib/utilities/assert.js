"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Test an assertion for its truthiness
 *
 * @param condition Assertion condition
 * @param message Error message if the assertion has failed
 */
exports.assert = function (condition, message) {
    if (!condition) {
        throw new Error("Assert -> Assertion failed" + (message ? ": " + message : ''));
    }
};
//# sourceMappingURL=assert.js.map