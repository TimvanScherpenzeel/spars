/**
 * Tests for Layout Worklet support
 */
export default (() => (!!(window as any).CSS && !!(window as any).CSS.layoutWorklet) || false)();
