/**
 * Tests for WebAudio support
 */
// @ts-ignore
export default (() => !!window.AudioContext || !!window.webkitAudioContext || false)();
