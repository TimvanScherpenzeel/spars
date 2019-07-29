// Events
import { eventEmitter } from '../../events/EventEmitter';

// Types
import { TUndefinable } from '../../types';

/**
 * Monitor geolocation changes
 */
function onGeolocationChangeHandler(position: Position): void {
  eventEmitter.emit('SPAR::GEOLOCATION_CHANGE', {
    position,
  });
}

export const onGeolocationChange = (): TUndefinable<number> => {
  let watchId;

  if (navigator.geolocation) {
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then(permissionStatus => {
        if (permissionStatus.state === 'granted') {
          watchId = navigator.geolocation.watchPosition(onGeolocationChangeHandler, err => {
            console.warn(err);
          });
        } else {
          console.warn('Geolocation sensor access is not granted or available');
        }
      });
    } else {
      watchId = navigator.geolocation.watchPosition(onGeolocationChangeHandler, err => {
        console.warn(err);
      });
    }
  } else {
    console.warn('Geolocation sensor is unavailable');
  }

  return watchId;
};

/**
 * Stop listening to geolocation change events
 */
export const offGeolocationChange = (watchId: number): void => {
  if (navigator.geolocation) {
    navigator.geolocation.clearWatch(watchId);
  }
};
