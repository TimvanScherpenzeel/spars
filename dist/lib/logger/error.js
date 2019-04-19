"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Config
var config_1 = require("../config");
/**
 * console.error() a message to the console in a prefixed format
 * Only logs when the low, medium or highest verbosity level is set
 * Gets disabled if verbosity is set to 0 (usually the case in production)
 *
 * @param message Message to error in the console
 */
exports.error = function (message) {
    return config_1.getConfigEntry('LOG_VERBOSITY') >= 1 && console.error("Alpine :: [ERROR] -> " + message);
};
//# sourceMappingURL=error.js.map