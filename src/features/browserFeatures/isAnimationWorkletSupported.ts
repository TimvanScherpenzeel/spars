/**
 * Tests for Animation Worklet support
 */
// @ts-ignore: missing type definition
export default (() => (!!window.CSS && !!window.CSS.animationWorklet) || false)();
