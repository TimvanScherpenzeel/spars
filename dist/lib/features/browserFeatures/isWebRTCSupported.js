"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Tests for WebRTC support
 */
exports.default = (function () {
    // @ts-ignore missing type definition
    return (!!window.RTCPeerConnection && !!window.RTCDataChannelEvent) ||
        // @ts-ignore missing type definition
        !!window.webkitRTCPeerConnection ||
        // @ts-ignore missing type definition
        !!window.mozRTCPeerConnection ||
        // @ts-ignore missing type definition
        !!window.msRTCPeerConnection ||
        // @ts-ignore missing type definition
        !!window.oRTCPeerConnection ||
        false;
})();
//# sourceMappingURL=isWebRTCSupported.js.map