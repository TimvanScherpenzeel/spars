// Constants
import { WINDOW_SIZE_CHANGE } from '../constants';

// Events
import { eventEmitter } from './EventEmitter';

// Utilities
import { debounce } from '../utilities/debounce';

/**
 * Monitor window size changes
 */
function onWindowSizeChangeHandler(): void {
  eventEmitter.emit(WINDOW_SIZE_CHANGE, {
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth,
  });
}

/**
 * Store reference allowing debounced function to be removed again
 */
const debouncedOnWindowSizeChange = debounce(onWindowSizeChangeHandler, 100);

/**
 * Start listening to window size change events
 */
export default ((): void => {
  window.addEventListener('resize', debouncedOnWindowSizeChange, false);
  window.addEventListener('orientationchange', debouncedOnWindowSizeChange, false);
})();
