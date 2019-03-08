/**
 * Tests for LocalStorage support
 */
export default (() => {
  try {
    return !!window.localStorage;
  } catch (err) {
    return false;
  }
})();
