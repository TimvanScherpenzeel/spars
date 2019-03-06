/**
 * Tests for UserActivation support
 *
 * @returns {boolean}
 */
export default (() => {
  try {
    // @ts-ignore
    return !!navigator.userActivation;
  } catch (err) {
    return false;
  }
})();
