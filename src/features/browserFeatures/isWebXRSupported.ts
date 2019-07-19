/**
 * Tests for WebXR support
 */
export default ((): boolean => !!(navigator as any).xr || false)();
