/**
 * Tests for Layout Worklet support
 *
 * @returns {boolean}
 */
// @ts-ignore
export default (() => (!!window.CSS && !!window.CSS.layoutWorklet) || false)();
