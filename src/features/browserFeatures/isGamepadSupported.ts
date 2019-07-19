/**
 * Tests for gamepad support
 */
export default ((): boolean => !!(window as any).Gamepad || false)();
