/**
 * Tests for requestIdleCallback support
 */
// @ts-ignore missing type definition
export default (() => !!window.requestIdleCallback || false)();
