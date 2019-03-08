/**
 * Tests for WebAssembly support
 */
// @ts-ignore: missing type definition
export default (() => !!window.WebAssembly || false)();
