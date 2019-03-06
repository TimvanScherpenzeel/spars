/**
 * Gets the device screen width and height
 *
 * @returns {number[]} Device screen [width, height] pair
 */
export default (() => [window.screen.width, window.screen.height] || [0, 0])();
