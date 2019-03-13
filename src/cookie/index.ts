// Features
import isCookieEnabled from '../features/browserSettings/isCookieEnabled';

// Logger
import { warn } from '../logger';

// NOTE: When blocking cookies Firefox throws a security error for localStorage and indexedDB blocking further execution.
/**
 * Set a cookie
 *
 * @param key Key of cookie
 * @param value Value of cookie
 * @param expiryDays After how many days the cookie expires
 */
export const setCookie = (key: string, value: string, expiryDays = 365) => {
  if (isCookieEnabled) {
    const date = new Date();
    date.setTime(date.getTime() + expiryDays * 86400000); // 24 * 60 * 60 * 1000 = 1 day
    const expires = `expires=${date.toUTCString()}`;

    document.cookie = `${key}=${value}; ${expires}; path=/; domain=${window.location.hostname.replace(
      'www.',
      ''
    )};`;
  } else {
    warn('Cookie -> Cookies are disabled, no cookie was set');
  }
};

/**
 * Get a cookie by key
 *
 * @param key Key of cookie to get
 */
export const getCookie = (key: string) => {
  if (isCookieEnabled) {
    const query = `${key}=`;
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1, cookie.length);
      }

      if (cookie.indexOf(query) === 0) {
        return cookie.substring(query.length, cookie.length);
      }
    }
  }

  warn('Cookie -> Cookies are disabled, no cookie was retrieved');

  return false;
};

/**
 * Delete a cookie by key
 *
 * @param key Key of cookie to delete
 */
export const deleteCookie = (key: string) => {
  if (isCookieEnabled) {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; domain=${window.location.hostname.replace(
      'www.',
      ''
    )}`;
  } else {
    warn('Cookie -> Cookies are disabled, no cookie was deleted');
  }
};
