/**
 * Tests for Animation Worklet support
 */
// @ts-ignore
export default (() => (!!window.CSS && !!window.CSS.animationWorklet) || false)();
