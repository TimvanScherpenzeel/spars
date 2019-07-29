// Events
import { eventEmitter } from '../../events/EventEmitter';

// Types
import { TNullable } from '../../types';

class GeolocationSensor {
  public watchId: TNullable<number> = null;

  /**
   * Start listening to geolocation change events
   */
  public on(): TNullable<number> {
    if (navigator.geolocation) {
      if (navigator.permissions) {
        navigator.permissions.query({ name: 'geolocation' }).then(permissionStatus => {
          if (permissionStatus.state === 'granted') {
            this.watchId = navigator.geolocation.watchPosition(this.onChangeHandler, err => {
              console.warn(err);
            });
          } else {
            console.warn('Geolocation sensor access is not granted or available');
          }
        });
      } else {
        this.watchId = navigator.geolocation.watchPosition(this.onChangeHandler, err => {
          console.warn(err);
        });
      }
    } else {
      console.warn('Geolocation sensor is unavailable');
    }

    return this.watchId;
  }

  /**
   * Stop listening to geolocation change events
   */
  public off(): void {
    if (navigator.geolocation && this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
    }
  }

  /**
   * Monitor geolocation changes
   */
  private onChangeHandler(position: Position): void {
    eventEmitter.emit('SPAR::GEOLOCATION_CHANGE', {
      position,
    });
  }
}

export const geolocationSensor = new GeolocationSensor();
