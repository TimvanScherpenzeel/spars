/**
 * Tests for WebAssembly support
 */
export default ((): boolean => !!(window as any).WebAssembly || false)();
