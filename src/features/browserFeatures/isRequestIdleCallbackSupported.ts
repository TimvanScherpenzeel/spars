/**
 * Tests for requestIdleCallback support
 *
 * @returns {boolean}
 */
// @ts-ignore
export default (() => !!window.requestIdleCallback || false)();
