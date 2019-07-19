/**
 * Tests for WebXR support
 */
export default (() => !!(navigator as any).xr || false)();
