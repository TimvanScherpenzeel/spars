// Features
import isCookieEnabled from '../features/browserSettings/isCookieEnabled';

// Types
import { TNullable, TUndefinable } from '../types';

// NOTE: When blocking cookies Firefox throws a security error for localStorage and indexedDB blocking further execution.
/**
 * Set a cookie
 *
 * @param key Key of cookie
 * @param value Value of cookie
 * @param expiryDays After how many days the cookie expires
 */
export const setCookie = (key: string, value: string, expiryDays = 365): void => {
  if (isCookieEnabled) {
    const date = new Date();
    date.setTime(date.getTime() + expiryDays * 86400000); // 24 * 60 * 60 * 1000 = 1 day
    const expires = `expires=${date.toUTCString()}`;

    document.cookie = `${key}=${value}; ${expires}; path=/; domain=${window.location.hostname.replace(
      'www.',
      ''
    )};`;
  } else {
    console.warn('Cookie -> Cookies are disabled, no cookie was set');
  }
};

/**
 * Get a cookie by key
 *
 * @param key Key of cookie to get
 */
export const getCookie = (key: string): TNullable<TUndefinable<string | number | boolean>> => {
  if (isCookieEnabled) {
    const match = document.cookie.match(`(^|;)\\s*${key}\\s*=\\s*([^;]+)`);
    const result = match ? match.pop() : '';

    // Convert number strings to numbers (integers, floats, hexadecimals)
    if ((result && /^\d+\.\d+$/.test(result)) || (result && /0[xX0-9A-Fa-f]{6}/g.test(result))) {
      return Number(result);
    }

    // Convert built-in types to their corresponding types
    switch (result) {
      case 'true':
        return true;
      case 'false':
        return false;
      case 'undefined':
        return undefined;
      case 'null':
        return null;
      default:
        return result;
    }
  }

  console.warn('Cookie -> Cookies are disabled, no cookie was retrieved');

  return false;
};

/**
 * Delete a cookie by key
 *
 * @param key Key of cookie to delete
 */
export const deleteCookie = (key: string): void => {
  if (isCookieEnabled) {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; domain=${window.location.hostname.replace(
      'www.',
      ''
    )}`;
  } else {
    console.warn('Cookie -> Cookies are disabled, no cookie was deleted');
  }
};
