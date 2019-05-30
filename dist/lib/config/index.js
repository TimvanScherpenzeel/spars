"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Acts like a global configuration object but avoids attaching itself to the window object
 */
exports.config = {
    LOG_VERBOSITY: 0,
};
/**
 * Gets a config entry
 *
 * @param key Key of config entry to get
 */
// @ts-ignore implicit any, has no index structure
exports.getConfigEntry = function (key) { return exports.config[key]; };
/**
 * Sets a config entry
 *
 * @param key Key of config entry to set
 * @param value Value of config entry to set
 */
exports.setConfigEntry = function (key, value) {
    // @ts-ignore implicit any, has no index structure
    return (exports.config[key] = value);
};
//# sourceMappingURL=index.js.map