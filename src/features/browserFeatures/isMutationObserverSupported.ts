/**
 * Tests for MutationObserver support
 */
export default (() => !!(window as any).MutationObserver || false)();
