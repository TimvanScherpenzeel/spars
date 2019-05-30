"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Tests for WebAudio support
 */
// @ts-ignore missing type definition
exports.default = (function () { return !!window.AudioContext || !!window.webkitAudioContext || false; })();
//# sourceMappingURL=isWebAudioSupported.js.map