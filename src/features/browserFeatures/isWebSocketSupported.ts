/**
 * Tests for WebSocket support
 */
export default (() => !!(window as any).WebSocket || false)();
