/**
 * Tests for requestIdleCallback support
 */
export default (() => !!(window as any).requestIdleCallback || false)();
