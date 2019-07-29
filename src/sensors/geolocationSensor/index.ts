// Events
import { eventEmitter } from '../../events/EventEmitter';

// Types
import { TNullable } from '../../types';

const SENSOR_FREQUENCY = 10;

class GeolocationSensor {
  public errors: any[] = [];

  private sensor: any;
  private watchId: TNullable<number> = null;

  /**
   * Start listening to geolocation change events
   */
  public on(frequency: number = SENSOR_FREQUENCY): void {
    let sensor = null;

    if ((window as any).GeolocationSensor) {
      if (navigator.permissions) {
        navigator.permissions.query({ name: 'geolocation' }).then(permissionStatus => {
          if (permissionStatus.state === 'granted') {
            sensor = new (window as any).GeolocationSensor({ frequency });
            sensor.addEventListener('error', this.onSensorErrorHandler);
          } else {
            console.warn('Ambient light sensor access is not granted or available');
          }
        });
      }

      if (sensor) {
        this.sensor = sensor;
        this.sensor.addEventListener('reading', this.onSensorReadHandler, false);
        this.sensor.start();
      }
    } else {
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
  }

  /**
   * Stop listening to geolocation change events
   */
  public off(): void {
    if (this.sensor) {
      this.sensor.stop();
      this.sensor.removeEventListener('reading', this.onSensorReadHandler, false);
      this.sensor.removeEventListener('error', this.onSensorErrorHandler, false);
      this.sensor = null;
    }

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
    if (this.sensor) {
      eventEmitter.emit('SPAR::GEOLOCATION_CHANGE', {
        position,
      });
    }

    if (position) {
      eventEmitter.emit('SPAR::GEOLOCATION_CHANGE', {
        position,
      });
    }
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
