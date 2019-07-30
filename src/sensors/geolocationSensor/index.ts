// Enum
import { ENUM } from '../../enum';

// Events
import { eventEmitter } from '../../events/EventEmitter';

// Types
import { TNullable } from '../../types';

const SENSOR_OPTIONS = {
  enableHighAccuracy: true,
  maximumAge: 0,
  timeout: 5000,
};

class GeolocationSensor {
  public errors: any[] = [];

  private watchId: TNullable<number> = null;

  /**
   * Start listening to geolocation change events
   */
  public on(): void {
    if (navigator.geolocation) {
      if (navigator.permissions) {
        navigator.permissions.query({ name: 'geolocation' }).then(permissionStatus => {
          if (permissionStatus.state === 'granted' || permissionStatus.state === 'prompt') {
            this.watchId = navigator.geolocation.watchPosition(
              this.onSensorReadHandler,
              this.onSensorErrorHandler,
              SENSOR_OPTIONS
            );
          } else {
            console.warn('Geolocation sensor access is not granted or available');
          }
        });
      } else {
        this.watchId = navigator.geolocation.watchPosition(
          this.onSensorReadHandler,
          this.onSensorErrorHandler,
          SENSOR_OPTIONS
        );
      }
    } else {
      console.warn('Geolocation sensor is unavailable');
    }
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
   * Monitor any geolocation change events
   *
   * @param position Geolocation position update
   */
  private onSensorReadHandler = (position: Position): void => {
    eventEmitter.emit(ENUM.GEOLOCATION_CHANGE, {
      position,
    });
  };

  /**
   * Catch any errors when monitoring geolocation changes
   *
   * @param err Geolocation sensor error event
   */
  private onSensorErrorHandler = (event: any): void => {
    if (event.message) {
      this.errors.push(event.message);

      console.error(event.message);
    }
  };
}

export const geolocationSensor = new GeolocationSensor();
