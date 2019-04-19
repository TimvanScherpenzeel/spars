"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Convert Blob to ArrayBuffer
 *
 * @param blob Blob to convert
 */
exports.convertBlobToArrayBuffer = function (blob) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.addEventListener('loadend', function (event) {
            // @ts-ignore
            resolve(reader.result);
        });
        reader.addEventListener('error', reject);
        reader.readAsArrayBuffer(blob);
    });
};
//# sourceMappingURL=convertBlobToArrayBuffer.js.map