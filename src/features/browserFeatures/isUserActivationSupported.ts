/**
 * Tests for UserActivation support
 */
export default (() => {
  try {
    return !!(navigator as any).userActivation;
  } catch (err) {
    return false;
  }
})();
