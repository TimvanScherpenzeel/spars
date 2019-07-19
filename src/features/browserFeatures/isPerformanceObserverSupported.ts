/**
 * Tests for PerformanceObserver support
 */
export default ((): boolean => !!(window as any).PerformanceObserver || false)();
