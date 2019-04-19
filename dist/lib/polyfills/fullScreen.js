"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var key = {
    fullscreenEnabled: 0,
    // tslint:disable-next-line:object-literal-sort-keys
    fullscreenElement: 1,
    requestFullscreen: 2,
    exitFullscreen: 3,
    fullscreenchange: 4,
    fullscreenerror: 5,
};
var webkit = [
    'webkitFullscreenEnabled',
    'webkitFullscreenElement',
    'webkitRequestFullscreen',
    'webkitExitFullscreen',
    'webkitfullscreenchange',
    'webkitfullscreenerror',
];
var moz = [
    'mozFullScreenEnabled',
    'mozFullScreenElement',
    'mozRequestFullScreen',
    'mozCancelFullScreen',
    'mozfullscreenchange',
    'mozfullscreenerror',
];
var ms = [
    'msFullscreenEnabled',
    'msFullscreenElement',
    'msRequestFullscreen',
    'msExitFullscreen',
    'MSFullscreenChange',
    'MSFullscreenError',
];
var prefix = ('fullscreenEnabled' in document && Object.keys(key)) ||
    (webkit[0] in document && webkit) ||
    (moz[0] in document && moz) ||
    (ms[0] in document && ms) ||
    [];
exports.fullScreen = {
    // @ts-ignore: implicit any, has no index structure
    requestFullscreen: function (element) { return element[prefix[key.requestFullscreen]](); },
    get exitFullscreen() {
        // @ts-ignore: implicit any, has no index structure
        return document[prefix[key.exitFullscreen]].bind(document);
    },
    addEventListener: function (type, handler, options) {
        // @ts-ignore: implicit any, has no index structure
        return document.addEventListener(prefix[key[type]], handler, options);
    },
    removeEventListener: function (type, handler, options) {
        // @ts-ignore: implicit any, has no index structure
        return document.removeEventListener(prefix[key[type]], handler, options);
    },
    get fullscreenSupported() {
        // @ts-ignore: implicit any, has no index structure
        return Boolean(document[prefix[key.fullscreenEnabled]]);
    },
    // tslint:disable-next-line:no-empty
    set fullscreenSupported(val) { },
    get fullscreenElement() {
        // @ts-ignore: implicit any, has no index structure
        return document[prefix[key.fullscreenElement]];
    },
    // tslint:disable-next-line:no-empty
    set fullscreenElement(val) { },
    get onfullscreenchange() {
        // @ts-ignore: implicit any, has no index structure
        return document[("on" + prefix[key.fullscreenchange]).toLowerCase()];
    },
    set onfullscreenchange(handler) {
        // @ts-ignore: implicit any, has no index structure
        return (document[("on" + prefix[key.fullscreenchange]).toLowerCase()] = handler);
    },
    get onfullscreenerror() {
        // @ts-ignore: implicit any, has no index structure
        return document[("on" + prefix[key.fullscreenerror]).toLowerCase()];
    },
    set onfullscreenerror(handler) {
        // @ts-ignore: implicit any, has no index structure
        document[("on" + prefix[key.fullscreenerror]).toLowerCase()] = handler;
    },
};
//# sourceMappingURL=fullScreen.js.map