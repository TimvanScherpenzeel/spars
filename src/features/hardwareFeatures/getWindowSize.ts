/**
 * Gets the browser window width and height
 *
 * @returns {number[]} Browser [width, height] pair
 */
export default (() => [window.innerWidth, window.innerHeight] || [0, 0])();
