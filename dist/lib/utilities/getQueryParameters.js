"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Get search parameters from URL
 *
 * ?isDebug=false&isGUI=true would result in { isDebug: false, isGUI: true }
 *
 * @param url query parameters
 */
exports.getQueryParameters = function (url) {
    if (url === void 0) { url = window.location.search; }
    return url
        // Remove ?
        .slice(1)
        // Split by &
        .split('&')
        // Find parameters
        .map(function (param) { return param.split('='); })
        // Construct { key: value } pairs
        .reduce(function (values, _a) {
        var key = _a[0], value = _a[1];
        // @ts-ignore implicit any, has no index structure
        values[key] = value;
        return values;
    }, {});
};
//# sourceMappingURL=getQueryParameters.js.map