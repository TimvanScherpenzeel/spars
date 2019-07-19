/**
 * Tests for WebRTC support
 */
export default (() =>
  (!!(window as any).RTCPeerConnection && !!(window as any).RTCDataChannelEvent) ||
  !!(window as any).webkitRTCPeerConnection ||
  !!(window as any).mozRTCPeerConnection ||
  !!(window as any).msRTCPeerConnection ||
  !!(window as any).oRTCPeerConnection ||
  false)();
