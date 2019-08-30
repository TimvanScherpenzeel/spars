// Constants
import { ORIENTATION_CHANGE } from '../constants';

// Events
import { eventEmitter } from './EventEmitter';

// Utilities
import { debounce } from '../utilities/debounce';

let orientation: { angle?: number } = {};

const getOrientation = (): any => {
  if (screen.orientation) {
    orientation = screen.orientation;
  } else {
    orientation.angle = Number(window.orientation) || 0;
  }

  return orientation;
};

/**
 * Store reference allowing debounced function to be removed again
 */
const debouncedOnOrientationChange = debounce(onOrientationChangeHandler, 100);

/**
 * Monitor orientation changes
 */
function onOrientationChangeHandler(): void {
  let isLandscape = false;
  const angle = getOrientation().angle;

  if (angle === 90 || angle === -90) {
    isLandscape = true;
  } else {
    isLandscape = false;
  }

  const isPortrait = !isLandscape;

  eventEmitter.emit(ORIENTATION_CHANGE, {
    angle,
    isLandscape,
    isPortrait,
  });
}

/**
 * Start listening to orientation change events
 */
export default ((): void => {
  window.addEventListener('orientationchange', debouncedOnOrientationChange, false);
})();
