// Events
import { eventEmitter } from '../../events/EventEmitter';

// Types
import { TNullable } from '../../types';

class GeolocationSensor {
  private watchId: TNullable<number> = null;

  /**
   * Start listening to geolocation change events
   */
  public on(): TNullable<number> {
    if (navigator.geolocation) {
      if (navigator.permissions) {
        navigator.permissions.query({ name: 'geolocation' }).then(permissionStatus => {
          if (permissionStatus.state === 'granted') {
            this.watchId = navigator.geolocation.watchPosition(
              this.onSensorReadHandler,
              this.onSensorErrorHandler
            );
          } else {
            console.warn('Geolocation sensor access is not granted or available');
          }
        });
      } else {
        this.watchId = navigator.geolocation.watchPosition(
          this.onSensorReadHandler,
          this.onSensorErrorHandler
        );
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
   *
   * @param position Geolocation position update
   */
  private onSensorReadHandler(position: Position): void {
    eventEmitter.emit('SPAR::GEOLOCATION_CHANGE', {
      position,
    });
  }

  /**
   * Catch any errors when monitoring geolocation changes
   *
   * @param err Geolocation sensor error event
   */
  private onSensorErrorHandler(err: PositionError): PositionError {
    console.warn(err);

    return err;
  }
}

export const geolocationSensor = new GeolocationSensor();
