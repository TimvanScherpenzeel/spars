/**
 * Tests for Audio Worklet support
 */
export default (() => !!(window as any).AudioWorklet || false)();
