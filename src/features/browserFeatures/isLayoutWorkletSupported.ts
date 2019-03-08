/**
 * Tests for Layout Worklet support
 */
// @ts-ignore: missing type definition
export default (() => (!!window.CSS && !!window.CSS.layoutWorklet) || false)();
