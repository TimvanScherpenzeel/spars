/**
 * Tests for Animation Worklet support
 *
 * @returns {boolean}
 */
// @ts-ignore
export default (() => (!!window.CSS && !!window.CSS.animationWorklet) || false)();
