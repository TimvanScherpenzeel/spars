"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Config
var config_1 = require("../config");
/**
 * console.warn() a message to the console in a prefixed format
 * Only logs when the medium or highest verbosity level is set
 *
 * @param message Message to warn in the console
 */
exports.warn = function (message) {
    return config_1.getConfigEntry('LOG_VERBOSITY') >= 2 && console.warn("Alpine :: [WARN] -> " + message);
};
//# sourceMappingURL=warn.js.map