"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Events
var EventEmitter_1 = require("./EventEmitter");
/**
 * Monitor connection changes and speed
 */
function onConnectionChange() {
    // ECT          RTT         Kbps    Explanation
    // slow-2g      2000	      50	    The network is suited for small transfers only such as text-only pages.
    // 2g	          1400	      70	    The network is suited for transfers of small images.
    // 3g	          270	        700	    The network is suited for transfers of large assets such as high resolution images, audio, and SD video.
    // 4g	          0	          ∞	      The network is suited for HD video, real-time video, etc.
    var connectionIsOnline = navigator.onLine || false;
    var connectionEffectiveType = 
    // @ts-ignore: navigator.connection does not exist yet as a type but is valid in the browser
    (navigator.connection && navigator.connection.effectiveType) || '4g';
    // @ts-ignore: navigator.connection does not exist yet as a type but is valid in the browser
    var connectionSaveData = (navigator.connection && navigator.connection.saveData) || false;
    var connectionSpeed;
    if (!connectionIsOnline) {
        connectionSpeed = 'CONNECTION_SPEED_0';
    }
    else {
        switch (connectionEffectiveType) {
            case 'slow-2g':
            case '2g':
                connectionSpeed = 'CONNECTION_SPEED_1';
                break;
            case '3g':
                connectionSpeed = 'CONNECTION_SPEED_2';
                break;
            case '4g':
            default:
                connectionSpeed = 'CONNECTION_SPEED_3';
        }
    }
    EventEmitter_1.eventEmitter.emit('ALPINE::CONNECTION_CHANGE', {
        connectionIsOnline: connectionIsOnline,
        connectionSaveData: connectionSaveData,
        connectionSpeed: connectionSpeed,
    });
}
/**
 * Start listening to connection change events
 */
exports.listenToConnectionChange = function () {
    // https://caniuse.com/#feat=netinfo (Chrome only for now)
    // @ts-ignore: navigator.connection does not exist yet as a type but is valid in the browser
    if (navigator.connection) {
        // @ts-ignore: navigator.connection does not exist yet as a type but is valid in the browser
        navigator.connection.addEventListener('change', onConnectionChange, false);
    }
    window.addEventListener('offline', onConnectionChange);
    window.addEventListener('online', onConnectionChange);
};
/**
 * Stop listening to connection change events
 */
exports.stopListeningToConnectionChange = function () {
    window.removeEventListener('offline', onConnectionChange);
    window.removeEventListener('online', onConnectionChange);
};
//# sourceMappingURL=onConnectionChange.js.map