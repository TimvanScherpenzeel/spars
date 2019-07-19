/**
 * Tests for inline web worker support
 */
export default (() => !!(window as any).Worker || false)();
