/**
 * Tests for Layout Worklet support
 */
export default ((): boolean => (!!(window as any).CSS && !!(window as any).CSS.layoutWorklet) || false)();
