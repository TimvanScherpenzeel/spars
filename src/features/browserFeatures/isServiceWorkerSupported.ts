/**
 * Tests for ServiceWorker support
 *
 * @returns {boolean}
 */
export default (() => !!navigator.serviceWorker || false)();
