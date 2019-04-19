"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns a function, that, as long as it continues to be invoked, will not be triggered.
 * The function will be called after it stops being called for n milliseconds
 *
 * @param func Function to execute
 * @param wait Amount of milliseconds to wait
 * @param immediate Trigger function on the leader edge instead of the trailing
 */
exports.debounce = function (func, wait, immediate) {
    if (immediate === void 0) { immediate = false; }
    var timeout;
    return function executedFunction() {
        // @ts-ignore
        var context = this;
        var args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    };
};
//# sourceMappingURL=debounce.js.map