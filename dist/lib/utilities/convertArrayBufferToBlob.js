"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Convert ArrayBuffer to Blob
 *
 * @param buffer Buffer to convert
 * @param type MIME type of ArrayBuffer to store
 */
exports.convertArrayBufferToBlob = function (buffer, type) {
    return new Blob([buffer], { type: type });
};
//# sourceMappingURL=convertArrayBufferToBlob.js.map