// Events
import { eventEmitter } from './EventEmitter';

/**
 * Monitor window size changes
 */
function onWindowSizeChange() {
  eventEmitter.emit('RIDGE::WINDOW_SIZE_CHANGE', {
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth,
  });
}

/**
 * Start listening to window size change events
 */
export const listenToWindowSizeChange = () => {
  window.addEventListener('resize', onWindowSizeChange, false);
  window.addEventListener('orientationchange', onWindowSizeChange, false);
};

/**
 * Stop listening to window size change events
 */
export const stopListeningToWindowSizeChange = () => {
  window.removeEventListener('resize', onWindowSizeChange);
  window.removeEventListener('orientationchange', onWindowSizeChange);
};
