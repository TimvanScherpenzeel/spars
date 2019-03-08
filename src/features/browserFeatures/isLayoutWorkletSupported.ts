/**
 * Tests for Layout Worklet support
 */
// @ts-ignore
export default (() => (!!window.CSS && !!window.CSS.layoutWorklet) || false)();
