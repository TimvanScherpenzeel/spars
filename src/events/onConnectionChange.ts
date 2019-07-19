// Events
import { eventEmitter } from './EventEmitter';

/**
 * Monitor connection changes and speed
 */
function onConnectionChange() {
  // ECT          RTT         Kbps    Explanation
  // slow-2g      2000	      50	    The network is suited for small transfers only such as text-only pages.
  // 2g	          1400	      70	    The network is suited for transfers of small images.
  // 3g	          270	        700	    The network is suited for transfers of large assets such as high resolution images, audio, and SD video.
  // 4g	          0	          ∞	      The network is suited for HD video, real-time video, etc.

  const connectionIsOnline = navigator.onLine || false;
  const connectionEffectiveType =
    ((navigator as any).connection && (navigator as any).connection.effectiveType) || '4g';
  const connectionSaveData =
    ((navigator as any).connection && (navigator as any).connection.saveData) || false;

  let connectionSpeed;

  if (!connectionIsOnline) {
    connectionSpeed = 'CONNECTION_SPEED_0';
  } else {
    switch (connectionEffectiveType) {
      case 'slow-2g':
      case '2g':
        connectionSpeed = 'CONNECTION_SPEED_1';
        break;
      case '3g':
        connectionSpeed = 'CONNECTION_SPEED_2';
        break;
      case '4g':
      default:
        connectionSpeed = 'CONNECTION_SPEED_3';
    }
  }

  eventEmitter.emit('ALPINE::CONNECTION_CHANGE', {
    connectionIsOnline,
    connectionSaveData,
    connectionSpeed,
  });
}

/**
 * Start listening to connection change events
 */
export const listenToConnectionChange = () => {
  // https://caniuse.com/#feat=netinfo (Chrome only for now)
  if ((navigator as any).connection) {
    (navigator as any).connection.addEventListener('change', onConnectionChange, false);
  }

  window.addEventListener('offline', onConnectionChange);
  window.addEventListener('online', onConnectionChange);
};

/**
 * Stop listening to connection change events
 */
export const stopListeningToConnectionChange = () => {
  window.removeEventListener('offline', onConnectionChange);
  window.removeEventListener('online', onConnectionChange);
};
