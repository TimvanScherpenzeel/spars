/**
 * Create a self-closing RPC worker that consumes a single asynchronous function
 *
 * Inspired by https://github.com/developit/greenlet
 */
export declare class Thread {
    /**
     * @param asyncFn Asynchronous function to process
     */
    constructor(asyncFn: any);
}
