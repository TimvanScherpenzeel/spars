// Enum
import { ENUM_WINDOW_SIZE_CHANGE } from '../enum';

// Events
import { eventEmitter } from './EventEmitter';

// Utilities
import { debounce } from '../utilities/debounce';

/**
 * Store reference allowing debounced function to be removed again
 */
const debouncedOnWindowSizeChange = debounce(onWindowSizeChangeHandler, 100);

/**
 * Monitor window size changes
 */
function onWindowSizeChangeHandler(): void {
  eventEmitter.emit(ENUM_WINDOW_SIZE_CHANGE, {
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth,
  });
}

/**
 * Start listening to window size change events
 */
export const onWindowSizeChange = (): void => {
  window.addEventListener('resize', debouncedOnWindowSizeChange, false);
  window.addEventListener('orientationchange', debouncedOnWindowSizeChange, false);
};

/**
 * Stop listening to window size change events
 */
export const offWindowSizeChange = (): void => {
  window.removeEventListener('resize', debouncedOnWindowSizeChange, false);
  window.removeEventListener('orientationchange', debouncedOnWindowSizeChange, false);
};
