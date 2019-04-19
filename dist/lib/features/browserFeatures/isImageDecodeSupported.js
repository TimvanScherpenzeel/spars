"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Tests for Image decode support
 */
exports.default = (function () {
    try {
        var image = new Image();
        return !!image.decode;
    }
    catch (err) {
        return false;
    }
})();
//# sourceMappingURL=isImageDecodeSupported.js.map