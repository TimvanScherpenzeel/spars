/**
 * Tests for WebP support
 *
 * @returns {boolean}
 */
export default (() => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;

  return canvas.toDataURL ? canvas.toDataURL('image/webp').indexOf('image/webp') === 5 : false;
})();
