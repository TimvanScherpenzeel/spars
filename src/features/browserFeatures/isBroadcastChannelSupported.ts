/**
 * Tests for BroadcastChannel support
 */
export default ((): boolean => !!(window as any).BroadcastChannel || false)();
