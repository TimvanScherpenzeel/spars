/**
 * Tests for IndexedDB support
 *
 * @returns {boolean}
 */
export default (() => {
  try {
    return !!window.indexedDB;
  } catch (err) {
    return false;
  }
})();
