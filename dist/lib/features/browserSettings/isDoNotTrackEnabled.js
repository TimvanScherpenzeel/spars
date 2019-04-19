"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Checks if the user has DoNotTrack enabled
 * This is useful for adhering to user wishes regarding analytics tracking
 */
exports.default = (function () {
    var doNotTrack = navigator.doNotTrack || false;
    if (!!doNotTrack && doNotTrack !== 'unspecified') {
        return true;
    }
    return false;
})();
//# sourceMappingURL=isDoNotTrackEnabled.js.map