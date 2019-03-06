/**
 * Tests for Audio Worklet support
 *
 * @returns {boolean}
 */
// @ts-ignore
export default (() => !!window.AudioWorklet || false)();
