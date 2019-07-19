/**
 * Tests for Paint Worklet support
 */
export default (() => (!!(window as any).CSS && !!(window as any).CSS.paintWorklet) || false)();
