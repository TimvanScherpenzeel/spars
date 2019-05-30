"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Tests for WebGL2 support
 */
exports.default = (function () {
    var canvas = document.createElement('canvas');
    // NOTE: there is no 'experimental-webgl2' as mentioned in https://webgl2fundamentals.org/webgl/lessons/webgl1-to-webgl2.html
    var gl = canvas.getContext('webgl2');
    // @ts-ignore missing type definition
    return (gl && gl instanceof WebGL2RenderingContext) || false;
});
//# sourceMappingURL=isWebGL2Supported.js.map