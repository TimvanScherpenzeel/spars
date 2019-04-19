"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Events
var EventEmitter_1 = require("./EventEmitter");
// Utilities
var debounce_1 = require("../utilities/debounce");
/**
 * Store reference allowing debounced function to be removed again
 */
var debouncedOnWindowSizeChange = debounce_1.debounce(onWindowSizeChange, 100);
/**
 * Monitor window size changes
 */
function onWindowSizeChange() {
    EventEmitter_1.eventEmitter.emit('ALPINE::WINDOW_SIZE_CHANGE', {
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth,
    });
}
/**
 * Start listening to window size change events
 */
exports.listenToWindowSizeChange = function () {
    window.addEventListener('resize', debouncedOnWindowSizeChange, false);
    window.addEventListener('orientationchange', debouncedOnWindowSizeChange, false);
};
/**
 * Stop listening to window size change events
 */
exports.stopListeningToWindowSizeChange = function () {
    window.removeEventListener('resize', debouncedOnWindowSizeChange, false);
    window.removeEventListener('orientationchange', debouncedOnWindowSizeChange, false);
};
//# sourceMappingURL=onWindowSizeChange.js.map