/**
 * Tests for Animation Worklet support
 */
export default ((): boolean =>
  (!!(window as any).CSS && !!(window as any).CSS.animationWorklet) || false)();
