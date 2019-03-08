/**
 * Tests for UserActivation support
 */
export default (() => {
  try {
    // @ts-ignore
    return !!navigator.userActivation;
  } catch (err) {
    return false;
  }
})();
