/**
 * Set a cookie
 *
 * @param key Key of cookie
 * @param value Value of cookie
 * @param expiryDays After how many days the cookie expires
 */
export declare const setCookie: (key: string, value: string, expiryDays?: number) => void;
/**
 * Get a cookie by key
 *
 * @param key Key of cookie to get
 */
export declare const getCookie: (key: string) => string | false | undefined;
/**
 * Delete a cookie by key
 *
 * @param key Key of cookie to delete
 */
export declare const deleteCookie: (key: string) => void;
