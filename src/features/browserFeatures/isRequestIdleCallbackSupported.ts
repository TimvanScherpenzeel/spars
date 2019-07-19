/**
 * Tests for requestIdleCallback support
 */
export default ((): boolean => !!(window as any).requestIdleCallback || false)();
