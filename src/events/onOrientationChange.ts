// Events
import { eventEmitter } from './EventEmitter';

/**
 * Monitor orientation changes
 */
function onOrientationChange() {
  const isLandscape = window.innerWidth > window.innerHeight;
  const isPortrait = !isLandscape;

  eventEmitter.emit('RIDGE::ORIENTATION_CHANGE', {
    isLandscape,
    isPortrait,
  });
}

/**
 * Start listening to orientation change events
 */
export const listenToOrientationChange = () => {
  window.addEventListener('orientationchange', onOrientationChange, false);
};

/**
 * Stop listening to orientation change events
 */
export const stopListeningToOrientationChange = () => {
  window.removeEventListener('orientationchange', onOrientationChange);
};
