"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Config
var config_1 = require("../config");
/**
 * console.log() a message to the console in a prefixed format
 * Only logs when the highest verbosity level is set
 *
 * @param message Message to log in the console
 */
exports.log = function (message) {
    return config_1.getConfigEntry('LOG_VERBOSITY') >= 3 && console.log("Alpine :: [LOG] -> " + message);
};
//# sourceMappingURL=log.js.map