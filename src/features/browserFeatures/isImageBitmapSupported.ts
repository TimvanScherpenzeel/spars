/**
 * Tests for ImageBitmap support
 */
export default (() =>
  (!!(window as any).ImageBitmap && !!(window as any).createImageBitmap) || false)();
