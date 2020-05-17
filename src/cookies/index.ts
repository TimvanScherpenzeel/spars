// Features
import isCookieEnabled from '../features/browserSettings/isCookieEnabled';

/**
 * Set a cookie
 *
 * NOTE: When blocking cookies Firefox throws a security error for localStorage and indexedDB blocking further execution
 *
 * @param key Key of cookie
 * @param value Value of cookie
 * @param expiryDays After how many days the cookie expires
 */
export const setCookie = (
  key: string,
  value: string,
  expiryDays = 365,
  path = '/',
  domain: string = window.location.hostname.replace('www.', '')
): void => {
  if (isCookieEnabled) {
    const date = new Date();
    date.setTime(date.getTime() + expiryDays * 86400000); // 24 * 60 * 60 * 1000 = 1 day
    const expires = `expires=${date.toUTCString()}`;

    document.cookie = `${key}=${value}; ${expires}; path=${path}; domain=${domain};`;
  } else {
    console.warn('Cookie -> Cookies are disabled, no cookie was set');
  }
};

/**
 * Get a cookie by key
 *
 * @param key Key of cookie to get
 */
export const getCookie = (key: string): boolean | undefined | null | number | string => {
  if (isCookieEnabled) {
    const match = document.cookie.match(`(^|;)\\s*${key}\\s*=\\s*([^;]+)`);
    const value = match ? match.pop() : '';

    const keywords = {
      false: false,
      null: null,
      true: true,
      undefined,
    };

    // Convert built-in types to their corresponding types
    if ((value as any) in keywords) {
      return (keywords as any)[value as any];
    }

    // Convert number strings to numbers (integers, floats, hexadecimals)
    if (value !== undefined && (/^\d+$/.test(value) || /^\d+\.\d+$/.test(value) || /0[xX0-9A-Fa-f]{6}/g.test(value))) {
      return Number(value);
    }
  } else {
    console.warn('Cookie -> Cookies are disabled, no cookie was retrieved');

    return undefined;
  }
};

/**
 * Delete a cookie by key
 *
 * @param key Key of cookie to delete
 */
export const deleteCookie = (
  key: string,
  path = '/',
  domain: string = window.location.hostname.replace('www.', '')
): void => {
  if (isCookieEnabled) {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=${path}; domain=${domain}`;
  } else {
    console.warn('Cookie -> Cookies are disabled, no cookie was deleted');
  }
};
