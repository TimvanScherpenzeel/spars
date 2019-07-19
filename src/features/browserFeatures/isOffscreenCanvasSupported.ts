/**
 * Tests for OffscreenCanvas support
 */
export default (() => !!(window as any).OffscreenCanvas || false)();
