// Features
import isWebWorkerInlineSupported from '../features/browserFeatures/isWebWorkerInlineSupported';

const createWorker = (asyncFunction: any) => {
  // A simple counter is used to generate worker-global unique ID's for RPC
  let TASK_ID = 0;

  // Outward-facing promises store their `controllers` (`[request, reject]`) here
  const promises: any = {};

  // Use a data URI for the worker's src. It inlines the target function and an RPC handler
  const script = `data:$$=${asyncFunction};onmessage=${(event: MessageEvent) => {
    // Invoking within then() captures exceptions in the supplied async function as rejections
    Promise.resolve(event.data[1])
      // @ts-ignore: $$ is internally globally available
      .then(v => $$.apply($$, v))
      .then(
        // success handler - callback(id, SUCCESS(0), result)
        // if `data` is transferable transfer zero-copy
        data => {
          postMessage(
            [event.data[0], 0, data],
            // @ts-ignore
            [data].filter(
              (x: any) =>
                x instanceof ArrayBuffer ||
                x instanceof MessagePort ||
                (createImageBitmap && x instanceof ImageBitmap)
            )
          );

          // Terminate the worker
          close();
        },

        // error handler - callback(id, ERROR(1), error)
        err => {
          // @ts-ignore
          postMessage([event.data[0], 1, `${err}`]);

          // Terminate the worker
          close();
        }
      );
  }}`;

  const blob = new Blob([script]);
  const workerURL = URL.createObjectURL(blob);
  const worker = new Worker(workerURL);

  /**
   * Handle RPC results/errors coming back out of the worker
   *
   * Messages coming from the worker take the form `[id, status, result]`:
   * id - counter-based unique ID for the RPC call
   * status - 0 for success, 1 for failure
   * result - the result or error, depending on `status`
   */
  worker.onmessage = (event: MessageEvent) => {
    // invoke the promise's resolve() or reject() depending on whether there was an error
    promises[event.data[0]][event.data[1]](event.data[2]);

    // and then delete the promise controller
    promises[event.data[0]] = null;

    // Mark slot as empty
  };

  // Return a proxy function that forwards calls to the worker and returns a promise for the result
  return function(args: any) {
    args = [].slice.call(arguments);
    return new Promise(function() {
      // Add the promise controller to the registry
      promises[++TASK_ID] = arguments;

      // Send an RPC call to the worker - call(id, params)
      // The filter is to provide a list of transferables to send zero-copy
      worker.postMessage(
        [TASK_ID, args],
        args.filter(
          (x: any) =>
            x instanceof ArrayBuffer ||
            x instanceof MessagePort ||
            (createImageBitmap && x instanceof ImageBitmap)
        )
      );
    });
  };
};

const tasks = [];

/**
 * Spawns a new thread, executes an asynchronous function and closes itself
 */
export class Thread {
  constructor(asyncFunction: any) {
    if (!isWebWorkerInlineSupported) {
      return function(args: any) {
        args = [].slice.call(arguments);
        return asyncFunction(args);
      };
    }

    // Add to queue
    // tasks.push(asyncFunction);

    // Take from queue (maximum of worker pool size can be active at the same time)

    return createWorker(asyncFunction);
  }
}
