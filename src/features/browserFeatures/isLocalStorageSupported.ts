/**
 * Tests for LocalStorage support
 *
 * @returns {boolean}
 */
export default (() => {
  try {
    return !!window.localStorage;
  } catch (err) {
    return false;
  }
})();
