/**
 * Tests for ImageBitmap support
 */
// @ts-ignore
export default (() => (!!window.ImageBitmap && !!window.createImageBitmap) || false)();
