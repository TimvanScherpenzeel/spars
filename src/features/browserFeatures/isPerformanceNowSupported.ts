/**
 * Tests for performance.now support
 */
export default (() => !!(window.performance && window.performance.now) || false)();
