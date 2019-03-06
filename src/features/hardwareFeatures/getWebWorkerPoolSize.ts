/**
 * Gets the CPU cores available for web worker threading
 *
 * @returns {number} Number of available CPU cores
 */
export default (() => navigator.hardwareConcurrency || 0)();
