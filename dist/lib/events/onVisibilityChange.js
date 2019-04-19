"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Events
var EventEmitter_1 = require("./EventEmitter");
// Create vendor agnostic API (inspired by https://github.com/rafrex/fscreen)
var key = {
    hidden: 0,
    visibilitychange: 1,
};
var webkit = ['webkitHidden', 'webkitvisibilitychange'];
var ms = ['msHidden', 'msvisibilitychange'];
var prefix = ('hidden' in document && Object.keys(key)) ||
    (webkit[0] in document && webkit) ||
    (ms[0] in document && ms) ||
    [];
/**
 * Re-exposes the document visibility API without the need for vendor-specific prefixes
 */
var visibility = {
    // True is page is not visible, false if page is visible
    get hidden() {
        // @ts-ignore: implicit any, has no index structure
        return Boolean(document[prefix[key.hidden]]);
    },
    // Vendor prefixed listeners
    addEventListener: function (type, handler, options) {
        // @ts-ignore: implicit any, has no index structure
        return document.addEventListener(prefix[key[type]], handler, options);
    },
    removeEventListener: function (type, handler, options) {
        // @ts-ignore: implicit any, has no index structure
        return document.removeEventListener(prefix[key[type]], handler, options);
    },
    // Visibility change listener
    get onvisibilitychange() {
        // @ts-ignore: implicit any, has no index structure
        return document[("on" + prefix[key.visibilitychange]).toLowerCase()];
    },
    set onvisibilitychange(handler) {
        // @ts-ignore: implicit any, has no index structure
        document[("on" + prefix[key.visibilitychange]).toLowerCase()] = handler;
    },
};
/**
 * Monitor visibility changes
 */
function onVisibilityChange() {
    EventEmitter_1.eventEmitter.emit('ALPINE::VISIBILITY_CHANGE', {
        isVisible: !visibility.hidden,
    });
}
/**
 * Start listening to visibility change events
 */
exports.listenToVisibilityChange = function () {
    visibility.addEventListener('visibilitychange', onVisibilityChange, false);
};
/**
 * Stop listening to visibility change events
 */
exports.stopListeningToVisibilityChange = function () {
    visibility.removeEventListener('visibilitychange', onVisibilityChange);
};
//# sourceMappingURL=onVisibilityChange.js.map