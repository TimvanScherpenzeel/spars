/**
 * Tests for inline web worker support
 */
// @ts-ignore missing type definition
export default (() => !!window.Worker || false)();
