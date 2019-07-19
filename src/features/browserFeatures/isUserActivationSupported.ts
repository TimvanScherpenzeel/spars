/**
 * Tests for UserActivation support
 */
export default ((): boolean => {
  try {
    return !!(navigator as any).userActivation;
  } catch (err) {
    return false;
  }
})();
