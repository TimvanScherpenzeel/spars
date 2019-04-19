"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Tests for WebP support
 */
exports.default = (function () {
    var canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL ? canvas.toDataURL('image/webp').indexOf('image/webp') === 5 : false;
})();
//# sourceMappingURL=isWebPSupported.js.map