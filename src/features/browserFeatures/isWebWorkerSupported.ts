/**
 * Tests for inline web worker support
 *
 * @returns {boolean}
 */
// @ts-ignore
export default (() => !!window.Worker || false)();
