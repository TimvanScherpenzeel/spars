/**
 * Tests for ImageBitmap support
 */
// @ts-ignore: missing type definition
export default (() => (!!window.ImageBitmap && !!window.createImageBitmap) || false)();
