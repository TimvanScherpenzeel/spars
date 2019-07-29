/**
 * Tests for WebGL2 support
 */
export default ((): boolean => {
  const canvas = document.createElement('canvas');

  // NOTE: there is no 'experimental-webgl2' as mentioned in https://webgl2fundamentals.org/webgl/lessons/webgl1-to-webgl2.html
  const gl = canvas.getContext('webgl2');

  return (gl && gl instanceof WebGL2RenderingContext) || false;
})();
