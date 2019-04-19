"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Vendor
var detect_ua_1 = require("detect-ua");
var device = new detect_ua_1.DetectUA();
exports.isMobile = device.isMobile, exports.isTablet = device.isTablet, exports.isDesktop = device.isDesktop, exports.isiOS = device.isiOS, exports.isAndroid = device.isAndroid, exports.browser = device.browser;
exports.isChrome = typeof exports.browser === 'object' && exports.browser.name === 'Chrome';
exports.isFirefox = typeof exports.browser === 'object' && exports.browser.name === 'Firefox';
exports.isSafari = typeof exports.browser === 'object' && exports.browser.name === 'Safari';
exports.isEdge = typeof exports.browser === 'object' && exports.browser.name === 'Microsoft Edge';
exports.isInternetExplorer = typeof exports.browser === 'object' && exports.browser.name === 'Internet Explorer';
exports.isOpera = typeof exports.browser === 'object' && exports.browser.name === 'Opera';
exports.isSamsungBrowser = typeof exports.browser === 'object' && exports.browser.name === 'Samsung Internet for Android';
exports.isYandexBrowser = typeof exports.browser === 'object' && exports.browser.name === 'Yandex Browser';
exports.isUCBrowser = typeof exports.browser === 'object' && exports.browser.name === 'UC Browser';
exports.isChromium = typeof exports.browser === 'object' && exports.browser.name === 'Chromium';
/**
 * Device and browser detection
 */
exports.default = {
    isDesktop: exports.isDesktop,
    isMobile: exports.isMobile,
    isTablet: exports.isTablet,
    isAndroid: exports.isAndroid,
    isiOS: exports.isiOS,
    isChrome: exports.isChrome,
    isChromium: exports.isChromium,
    isEdge: exports.isEdge,
    isFirefox: exports.isFirefox,
    isInternetExplorer: exports.isInternetExplorer,
    isOpera: exports.isOpera,
    isSafari: exports.isSafari,
    isSamsungBrowser: exports.isSamsungBrowser,
    isUCBrowser: exports.isUCBrowser,
    isYandexBrowser: exports.isYandexBrowser,
    browserName: (typeof exports.browser === 'object' && exports.browser.name) || '',
    browserVersion: (typeof exports.browser === 'object' && exports.browser.version) || '',
};
//# sourceMappingURL=getBrowserType.js.map