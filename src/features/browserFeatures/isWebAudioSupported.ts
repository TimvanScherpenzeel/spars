/**
 * Tests for WebAudio support
 */
export default (() =>
  !!(window as any).AudioContext || !!(window as any).webkitAudioContext || false)();
