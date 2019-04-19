"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Features
var isCookieEnabled_1 = __importDefault(require("../features/browserSettings/isCookieEnabled"));
// Logger
var logger_1 = require("../logger");
// NOTE: When blocking cookies Firefox throws a security error for localStorage and indexedDB blocking further execution.
/**
 * Set a cookie
 *
 * @param key Key of cookie
 * @param value Value of cookie
 * @param expiryDays After how many days the cookie expires
 */
exports.setCookie = function (key, value, expiryDays) {
    if (expiryDays === void 0) { expiryDays = 365; }
    if (isCookieEnabled_1.default) {
        var date = new Date();
        date.setTime(date.getTime() + expiryDays * 86400000); // 24 * 60 * 60 * 1000 = 1 day
        var expires = "expires=" + date.toUTCString();
        document.cookie = key + "=" + value + "; " + expires + "; path=/; domain=" + window.location.hostname.replace('www.', '') + ";";
    }
    else {
        logger_1.warn('Cookie -> Cookies are disabled, no cookie was set');
    }
};
/**
 * Get a cookie by key
 *
 * @param key Key of cookie to get
 */
exports.getCookie = function (key) {
    if (isCookieEnabled_1.default) {
        var result = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
        return result ? result.pop() : '';
    }
    logger_1.warn('Cookie -> Cookies are disabled, no cookie was retrieved');
    return false;
};
/**
 * Delete a cookie by key
 *
 * @param key Key of cookie to delete
 */
exports.deleteCookie = function (key) {
    if (isCookieEnabled_1.default) {
        document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; domain=" + window.location.hostname.replace('www.', '');
    }
    else {
        logger_1.warn('Cookie -> Cookies are disabled, no cookie was deleted');
    }
};
//# sourceMappingURL=index.js.map