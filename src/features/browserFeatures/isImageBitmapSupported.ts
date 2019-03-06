/**
 * Tests for ImageBitmap support
 *
 * @returns {boolean}
 */
// @ts-ignore
export default (() => (!!window.ImageBitmap && !!window.createImageBitmap) || false)();
