/**
 * Gets the device pixel ratio of the device
 * Note that different zooming levels change the device pixel ratio
 *
 * @returns {number} device pixel ratio
 */
export default (() => window.devicePixelRatio || 1)();
