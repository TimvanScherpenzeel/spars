// Enum
import { ENUM_VISIBILITY_CHANGE } from '../enum';

// Events
import { eventEmitter } from './EventEmitter';

// Create vendor agnostic API (inspired by https://github.com/rafrex/fscreen)
const key = {
  hidden: 0,
  visibilitychange: 1,
};

const webkit = ['webkitHidden', 'webkitvisibilitychange'];

const ms = ['msHidden', 'msvisibilitychange'];

const prefix =
  ('hidden' in document && Object.keys(key)) ||
  (webkit[0] in document && webkit) ||
  (ms[0] in document && ms) ||
  [];

/**
 * Re-exposes the document visibility API without the need for vendor-specific prefixes
 */
const visibility = {
  // True is page is not visible, false if page is visible
  get hidden(): boolean {
    return Boolean((document as any)[prefix[key.hidden]]);
  },

  // Vendor prefixed listeners
  addEventListener: (type: string, handler: () => void, options?: any): void =>
    document.addEventListener(prefix[(key as any)[type]], handler, options),

  removeEventListener: (type: string, handler: () => void, options?: any): void =>
    document.removeEventListener(prefix[(key as any)[type]], handler, options),

  // Visibility change listener
  get onvisibilitychange(): void {
    return (document as any)[`on${prefix[key.visibilitychange]}`.toLowerCase()];
  },

  set onvisibilitychange(handler) {
    (document as any)[`on${prefix[key.visibilitychange]}`.toLowerCase()] = handler;
  },
};

/**
 * Monitor visibility changes
 */
function onVisibilityChangeHandler(): void {
  eventEmitter.emit(ENUM_VISIBILITY_CHANGE, {
    isVisible: !visibility.hidden,
  });
}

/**
 * Start listening to visibility change events
 */
export const onVisibilityChange = (): void => {
  visibility.addEventListener('visibilitychange', onVisibilityChangeHandler, false);
};

/**
 * Stop listening to visibility change events
 */
export const offVisibilityChange = (): void => {
  visibility.removeEventListener('visibilitychange', onVisibilityChangeHandler);
};
