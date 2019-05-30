/**
 * Tests for Audio Worklet support
 */
// @ts-ignore missing type definition
export default (() => !!window.AudioWorklet || false)();
