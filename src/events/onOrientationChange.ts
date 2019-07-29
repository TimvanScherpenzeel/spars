// Events
import { eventEmitter } from './EventEmitter';

// Utilities
import { debounce } from '../utilities/debounce';

const getOrientation = (): any => {
  let orientation: { angle?: number } = {};

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
  const orientation = getOrientation();
  const angle = orientation.angle;

  if (orientation) {
    if (angle === 90 || angle === -90) {
      isLandscape = true;
    } else {
      isLandscape = false;
    }
  } else {
    isLandscape = true;
  }

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
