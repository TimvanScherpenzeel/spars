/**
 * Gets the CPU cores available for web worker threading
 */
export default (() => navigator.hardwareConcurrency || 0)();
