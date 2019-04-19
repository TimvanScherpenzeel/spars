"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Events
var EventEmitter_1 = require("./EventEmitter");
// Utilities
var debounce_1 = require("../utilities/debounce");
/**
 * Store reference allowing debounced function to be removed again
 */
var debouncedOnOrientationChange = debounce_1.debounce(onOrientationChange, 100);
/**
 * Monitor orientation changes
 */
function onOrientationChange() {
    var isLandscape = window.innerWidth > window.innerHeight;
    var isPortrait = !isLandscape;
    EventEmitter_1.eventEmitter.emit('ALPINE::ORIENTATION_CHANGE', {
        isLandscape: isLandscape,
        isPortrait: isPortrait,
    });
}
/**
 * Start listening to orientation change events
 */
exports.listenToOrientationChange = function () {
    window.addEventListener('orientationchange', debouncedOnOrientationChange, false);
};
/**
 * Stop listening to orientation change events
 */
exports.stopListeningToOrientationChange = function () {
    window.removeEventListener('orientationchange', debouncedOnOrientationChange, false);
};
//# sourceMappingURL=onOrientationChange.js.map