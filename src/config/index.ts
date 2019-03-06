/**
 * Acts like a global configuration object but avoids attaching itself to the window object
 */
export const config = {
  LOG_VERBOSITY: 0, // [0 - 3]
};

/**
 * Gets a config entry
 *
 * @param {string} key Key
 */
// @ts-ignore
export const getConfigEntry = (key: string) => config[key];

/**
 * Sets a config entry
 *
 * @param {string} key Key
 * @param {string|boolean|number} value Value
 */
export const setConfigEntry = (key: string, value: string | boolean | number) =>
  // @ts-ignore
  (config[key] = value);
