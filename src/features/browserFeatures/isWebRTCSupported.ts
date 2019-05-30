/**
 * Tests for WebRTC support
 */
export default (() =>
  // @ts-ignore missing type definition
  (!!window.RTCPeerConnection && !!window.RTCDataChannelEvent) ||
  // @ts-ignore missing type definition
  !!window.webkitRTCPeerConnection ||
  // @ts-ignore missing type definition
  !!window.mozRTCPeerConnection ||
  // @ts-ignore missing type definition
  !!window.msRTCPeerConnection ||
  // @ts-ignore missing type definition
  !!window.oRTCPeerConnection ||
  false)();
