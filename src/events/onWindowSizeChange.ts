// Events
import { eventEmitter } from './EventEmitter';

// Utilities
import { debounce } from '../utilities/debounce';

/**
 * Store reference allowing debounced function to be removed again
 */
const debouncedOnWindowSizeChange = debounce(onWindowSizeChange, 100);

/**
 * Monitor window size changes
 */
function onWindowSizeChange(): void {
  eventEmitter.emit('ALPINE::WINDOW_SIZE_CHANGE', {
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth,
  });
}

/**
 * Start listening to window size change events
 */
export const listenToWindowSizeChange = (): void => {
  window.addEventListener('resize', debouncedOnWindowSizeChange, false);
  window.addEventListener('orientationchange', debouncedOnWindowSizeChange, false);
};

/**
 * Stop listening to window size change events
 */
export const stopListeningToWindowSizeChange = (): void => {
  window.removeEventListener('resize', debouncedOnWindowSizeChange, false);
  window.removeEventListener('orientationchange', debouncedOnWindowSizeChange, false);
};
