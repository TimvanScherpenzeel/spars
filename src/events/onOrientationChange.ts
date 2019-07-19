// Events
import { eventEmitter } from './EventEmitter';

// Utilities
import { debounce } from '../utilities/debounce';

/**
 * Store reference allowing debounced function to be removed again
 */
const debouncedOnOrientationChange = debounce(onOrientationChange, 100);

/**
 * Monitor orientation changes
 */
function onOrientationChange(): void {
  const isLandscape = window.innerWidth > window.innerHeight;
  const isPortrait = !isLandscape;

  eventEmitter.emit('ALPINE::ORIENTATION_CHANGE', {
    isLandscape,
    isPortrait,
  });
}

/**
 * Start listening to orientation change events
 */
export const listenToOrientationChange = (): void => {
  window.addEventListener('orientationchange', debouncedOnOrientationChange, false);
};

/**
 * Stop listening to orientation change events
 */
export const stopListeningToOrientationChange = (): void => {
  window.removeEventListener('orientationchange', debouncedOnOrientationChange, false);
};
