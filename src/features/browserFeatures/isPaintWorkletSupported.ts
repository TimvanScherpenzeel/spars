/**
 * Tests for Paint Worklet support
 *
 * @returns {boolean}
 */
// @ts-ignore
export default (() => (!!window.CSS && !!window.CSS.paintWorklet) || false)();
