/**
 * Tests for SessionStorage support
 */
export default (() => {
  try {
    return !!window.sessionStorage;
  } catch (err) {
    return false;
  }
})();
