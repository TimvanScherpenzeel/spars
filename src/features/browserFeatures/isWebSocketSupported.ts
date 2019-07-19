/**
 * Tests for WebSocket support
 */
export default ((): boolean => !!(window as any).WebSocket || false)();
