/**
 * Tests for Animation Worklet support
 */
export default (() => (!!(window as any).CSS && !!(window as any).CSS.animationWorklet) || false)();
