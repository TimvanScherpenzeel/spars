/**
 * Tests for IntersectionObserver support
 */
export default (() => !!(window as any).IntersectionObserver || false)();
