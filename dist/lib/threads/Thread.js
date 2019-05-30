"use strict";
// TODO: add way to limit concurrent threads (p-queue?)
// TODO: add way to re-use existing workers (worker pool)
// TODO: add way to dynamically allocate an optimal amount of workers
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Features
var getBrowserType_1 = require("../features/browserFeatures/getBrowserType");
var isWebWorkerInlineSupported_1 = __importDefault(require("../features/browserFeatures/isWebWorkerInlineSupported"));
/**
 * Create a self-closing RPC worker that consumes a single asynchronous function
 *
 * Inspired by https://github.com/developit/greenlet
 */
var Thread = /** @class */ (function () {
    /**
     * @param asyncFn Asynchronous function to process
     */
    function Thread(asyncFn) {
        // Execute on main thread as a fallback solution
        // Internet Explorer 11 does not support Promise without being polyfilled
        // which is too costly to ship along with the worker to make it worth including
        if (!isWebWorkerInlineSupported_1.default || getBrowserType_1.isInternetExplorer) {
            return function (args) {
                args = [].slice.call(arguments);
                return asyncFn(args);
            };
        }
        // A simple counter is used to generate worker-global unique ID's for RPC
        var WORKER_ID = 0;
        // Outward-facing promises store their `controllers` (`[request, reject]`) here
        var promises = {};
        // @ts-ignore fallback to webkitURL if necessary (https://caniuse.com/#search=createObjectURL)
        var URL = window.URL || window.webkitURL;
        // Use a data URI for the worker's src. It inlines the target function and an RPC handler
        var workerURL = URL.createObjectURL(new Blob([
            "$$=" + asyncFn + ";onmessage=" + function (event) {
                if (event) {
                    // Invoking within then() captures exceptions in the supplied async function as rejections
                    Promise.resolve(event.data[1])
                        // @ts-ignore $$ is internally globally available
                        .then(function (args) { return $$.apply($$, args); })
                        .then(
                    // success handler - callback(id, SUCCESS(0), result)
                    // if `data` is transferable transfer zero-copy
                    function (data) {
                        postMessage([event.data[0], 0, data], 
                        // @ts-ignore
                        [data].filter(function (transfer) {
                            return transfer instanceof ArrayBuffer ||
                                transfer instanceof MessagePort ||
                                (self.createImageBitmap && transfer instanceof ImageBitmap);
                        }));
                        // Terminate the worker
                        close();
                    }, 
                    // error handler - callback(id, ERROR(1), error)
                    function (err) {
                        // @ts-ignore
                        postMessage([event.data[0], 1, "" + err]);
                        // Terminate the worker
                        close();
                    });
                }
            },
        ]));
        var worker = new Worker(workerURL);
        URL.revokeObjectURL(workerURL);
        /**
         * Handle RPC results/errors coming back out of the worker
         *
         * Messages coming from the worker take the form `[id, status, result]`:
         * id - counter-based unique ID for the RPC call
         * status - 0 for success, 1 for failure
         * result - the result or error, depending on `status`
         */
        worker.onmessage = function (event) {
            // invoke the promise's resolve() or reject() depending on whether there was an error
            promises[event.data[0]][event.data[1]](event.data[2]);
            // and then delete the promise controller
            promises[event.data[0]] = null;
        };
        // Return a proxy function that forwards calls to the worker and returns a promise for the result
        return function (args) {
            args = [].slice.call(arguments);
            return new Promise(function () {
                // Add the promise controller to the registry
                promises[++WORKER_ID] = arguments;
                // Send an RPC call to the worker - call(id, params)
                // The filter is to provide a list of transferables to send zero-copy
                worker.postMessage([WORKER_ID, args], args.filter(function (transfer) {
                    return transfer instanceof ArrayBuffer ||
                        transfer instanceof MessagePort ||
                        (window.createImageBitmap && transfer instanceof ImageBitmap);
                }));
            });
        };
    }
    return Thread;
}());
exports.Thread = Thread;
//# sourceMappingURL=Thread.js.map