/**
 * Tests for WebAudio support
 *
 * @returns {boolean}
 */
// @ts-ignore
export default (() => !!window.AudioContext || !!window.webkitAudioContext || false)();
