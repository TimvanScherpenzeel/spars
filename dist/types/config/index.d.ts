/**
 * Acts like a global configuration object but avoids attaching itself to the window object
 */
export declare const config: {
    LOG_VERBOSITY: number;
};
/**
 * Gets a config entry
 *
 * @param key Key of config entry to get
 */
export declare const getConfigEntry: (key: string) => any;
/**
 * Sets a config entry
 *
 * @param key Key of config entry to set
 * @param value Value of config entry to set
 */
export declare const setConfigEntry: (key: string, value: string | number | boolean) => string | number | boolean;
