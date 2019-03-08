/**
 * Tests for requestIdleCallback support
 */
// @ts-ignore
export default (() => !!window.requestIdleCallback || false)();
