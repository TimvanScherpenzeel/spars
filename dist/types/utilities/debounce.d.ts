/**
 * Returns a function, that, as long as it continues to be invoked, will not be triggered.
 * The function will be called after it stops being called for n milliseconds
 *
 * @param func Function to execute
 * @param wait Amount of milliseconds to wait
 * @param immediate Trigger function on the leader edge instead of the trailing
 */
export declare const debounce: (func: any, wait: number, immediate?: boolean) => () => void;
