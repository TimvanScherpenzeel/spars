/**
 * Tests for Paint Worklet support
 */
// @ts-ignore: missing type definition
export default (() => (!!window.CSS && !!window.CSS.paintWorklet) || false)();
