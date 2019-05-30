"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Tests for inline web worker support
 */
exports.default = (function () {
    try {
        // @ts-ignore missing type definition
        var URL_1 = window.URL || window.webkitURL;
        // @ts-ignore missing type definition
        if (URL_1 === undefined || window.Blob === undefined || window.Worker === undefined) {
            return false;
        }
        var blob = new Blob(['']);
        var oURL = URL_1.createObjectURL(blob);
        var worker = new Worker(oURL);
        URL_1.revokeObjectURL(oURL);
        if (worker) {
            worker.terminate();
            return true;
        }
        return false;
    }
    catch (err) {
        return false;
    }
})();
//# sourceMappingURL=isWebWorkerInlineSupported.js.map