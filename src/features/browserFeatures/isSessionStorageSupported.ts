/**
 * Tests for SessionStorage support
 *
 * @returns {boolean}
 */
export default (() => {
  try {
    return !!window.sessionStorage;
  } catch (err) {
    return false;
  }
})();
