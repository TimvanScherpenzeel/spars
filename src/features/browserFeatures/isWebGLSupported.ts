/**
 * Tests for WebGL support
 */
export default ((): boolean => {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  return (gl && gl instanceof WebGLRenderingContext) || false;
})();
