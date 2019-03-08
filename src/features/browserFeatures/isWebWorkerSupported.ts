/**
 * Tests for inline web worker support
 */
// @ts-ignore
export default (() => !!window.Worker || false)();
