"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Tests for WebGL support
 */
exports.default = (function () {
    var canvas = document.createElement('canvas');
    var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return (gl && gl instanceof WebGLRenderingContext) || false;
})();
//# sourceMappingURL=isWebGLSupported.js.map