/**
 * Tests for WebAssembly support
 */
export default (() => !!(window as any).WebAssembly || false)();
