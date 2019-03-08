/**
 * Tests for Paint Worklet support
 */
// @ts-ignore
export default (() => (!!window.CSS && !!window.CSS.paintWorklet) || false)();
