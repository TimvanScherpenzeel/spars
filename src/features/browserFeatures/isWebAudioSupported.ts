/**
 * Tests for WebAudio support
 */
// @ts-ignore missing type definition
export default (() => !!window.AudioContext || !!window.webkitAudioContext || false)();
