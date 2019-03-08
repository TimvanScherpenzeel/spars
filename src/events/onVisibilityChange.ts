// Events
import { eventEmitter } from './EventEmitter';

// Create vendor agnostic API (inspired by https://github.com/rafrex/fscreen)
const key = {
  hidden: 0,
  visibilitychange: 1,
};

const webkit = ['webkitHidden', 'webkitvisibilitychange'];

const ms = ['msHidden', 'msvisibilitychange'];

const vendor =
  ('hidden' in document && Object.keys(key)) ||
  (webkit[0] in document && webkit) ||
  (ms[0] in document && ms) ||
  [];

/**
 * Re-exposes the document visibility API without the need for vendor-specific prefixes
 */
const visibility = {
  // True is page is not visible, false if page is visible
  get hidden() {
    // @ts-ignore: implicit any, has no index structure
    return Boolean(document[vendor[key.hidden]]);
  },

  // Vendor prefixed listeners
  addEventListener: (type: string, handler: () => void, options?: any) =>
    // @ts-ignore: implicit any, has no index structure
    document.addEventListener(vendor[key[type]], handler, options),

  removeEventListener: (type: string, handler: () => void, options?: any) =>
    // @ts-ignore: implicit any, has no index structure
    document.removeEventListener(vendor[key[type]], handler, options),

  // Visibility change listener
  get onvisibilitychange() {
    // @ts-ignore: implicit any, has no index structure
    return document[`on${vendor[key.visibilitychange]}`.toLowerCase()];
  },

  set onvisibilitychange(handler) {
    // @ts-ignore: implicit any, has no index structure
    document[`on${vendor[key.visibilitychange]}`.toLowerCase()] = handler;
  },
};

/**
 * Monitor visibility changes
 */
function onVisibilityChange() {
  eventEmitter.emit('RIDGE::VISIBILITY_CHANGE', {
    isVisible: !visibility.hidden,
  });
}

/**
 * Monitor visibility changes
 */
export const listenToVisibilityChange = () => {
  visibility.addEventListener('visibilitychange', onVisibilityChange, false);
};

export const stopListeningToVisibilityChange = () => {
  visibility.removeEventListener('visibilitychange', onVisibilityChange);
};
