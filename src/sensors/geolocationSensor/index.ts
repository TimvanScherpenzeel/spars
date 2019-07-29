// Events
import { eventEmitter } from '../../events/EventEmitter';

// Types
import { TNullable } from '../../types';

// TODO: add Generic Sensor API interface

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
  private onSensorErrorHandler(err: PositionError): void {
    this.errors.push(err.message);

    console.error(err.message);
  }
}

export const geolocationSensor = new GeolocationSensor();
