/**
 * Tests for performance.now support
 *
 * @returns {boolean}
 */
export default (() => !!(window.performance && window.performance.now) || false)();
