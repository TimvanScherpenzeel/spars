"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Gets the device byte endianness
 */
exports.default = (function () {
    // @ts-ignore: missing type definition
    if (window.ArrayBuffer !== null) {
        var buffer = new ArrayBuffer(4);
        var intView = new Uint32Array(buffer);
        var byteView = new Uint8Array(buffer);
        intView[0] = 1;
        return byteView[0] === 1 ? 'little' : 'big';
    }
    return 'Unknown';
})();
//# sourceMappingURL=getEndianness.js.map