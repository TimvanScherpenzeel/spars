/**
 * Checks if the user has cookies enabled
 * This is useful for adhering to user wishes regarding analytics tracking
 *
 * @returns {boolean}
 */
export default (() => !!navigator.cookieEnabled || false)();
