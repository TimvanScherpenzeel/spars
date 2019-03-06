/**
 * Tests for WebVR support
 *
 * @returns {boolean}
 */
export default (() => !!navigator.getVRDisplays || false)();
