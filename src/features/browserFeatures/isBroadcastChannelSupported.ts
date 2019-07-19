/**
 * Tests for BroadcastChannel support
 */
export default (() => !!(window as any).BroadcastChannel || false)();
