/**
 * Tests for BroadcastChannel support
 */
// @ts-ignore missing type definition
export default (() => !!window.BroadcastChannel || false)();
