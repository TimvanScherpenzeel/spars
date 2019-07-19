/**
 * Tests for PerformanceObserver support
 */
export default (() => !!(window as any).PerformanceObserver || false)();
