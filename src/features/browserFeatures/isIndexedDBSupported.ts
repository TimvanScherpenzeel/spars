/**
 * Tests for IndexedDB support
 */
export default (() => {
  try {
    return !!window.indexedDB;
  } catch (err) {
    return false;
  }
})();
