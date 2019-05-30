/**
 * Tests for PerformanceObserver support
 */
// @ts-ignore missing type definition
export default (() => !!window.PerformanceObserver || false)();
