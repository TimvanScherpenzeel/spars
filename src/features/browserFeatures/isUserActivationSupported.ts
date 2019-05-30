/**
 * Tests for UserActivation support
 */
export default (() => {
  try {
    // @ts-ignore missing type definition
    return !!navigator.userActivation;
  } catch (err) {
    return false;
  }
})();
