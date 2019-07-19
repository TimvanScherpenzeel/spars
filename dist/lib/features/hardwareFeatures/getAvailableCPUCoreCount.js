"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Gets the CPU cores available for web worker threading
 */
exports.default = (function () { return navigator.hardwareConcurrency || 0; })();
//# sourceMappingURL=getAvailableCPUCoreCount.js.map