// Events
import { eventEmitter } from './EventEmitter';

// Utilities
import { debounce } from '../utilities/debounce';

/**
 * Store reference allowing debounced function to be removed again
 */
const debouncedOnOrientationChange = debounce(onOrientationChangeHandler, 100);

/**
 * Monitor orientation changes
 */
function onOrientationChangeHandler(): void {
  const angle = (screen.orientation as ScreenOrientation).angle;
  // TODO: isLandscape check is too fast and returns the inverse result
  const isLandscape = window.innerWidth > window.innerHeight;
  const isPortrait = !isLandscape;

  eventEmitter.emit('SPAR::ORIENTATION_CHANGE', {
    angle,
    isLandscape,
    isPortrait,
  });
}

/**
 * Start listening to orientation change events
 */
export const onOrientationChange = (): void => {
  window.addEventListener('orientationchange', debouncedOnOrientationChange, false);
};

/**
 * Stop listening to orientation change events
 */
export const offOrientationChange = (): void => {
  window.removeEventListener('orientationchange', debouncedOnOrientationChange, false);
};
