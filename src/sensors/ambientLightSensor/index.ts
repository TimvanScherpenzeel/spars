// Enum
import { ENUM_AMBIENT_LIGHT_CHANGE } from '../../enum';

// Events
import { eventEmitter } from '../../events/EventEmitter';

const SENSOR_FREQUENCY = 10;

class AmbientLightSensor {
  public errors: any[] = [];

  private sensor: any;

  /**
   * Start listening to ambient light change events
   */
  public on(frequency: number = SENSOR_FREQUENCY): void {
    let sensor = null;

    if ((window as any).AmbientLightSensor) {
      if (navigator.permissions) {
        navigator.permissions.query({ name: 'ambient-light-sensor' }).then(permissionStatus => {
          if (permissionStatus.state === 'granted') {
            sensor = new (window as any).AmbientLightSensor({ frequency });
            sensor.addEventListener('error', this.onSensorErrorHandler);
          } else {
            console.warn('Ambient light sensor access is not granted or available');
          }
        });
      } else {
        sensor = new (window as any).AmbientLightSensor({ frequency });
        sensor.addEventListener('error', this.onSensorErrorHandler, false);
      }

      if (sensor) {
        this.sensor = sensor;
        this.sensor.addEventListener('reading', this.onSensorReadHandler, false);
        this.sensor.start();
      }
    } else {
      console.warn('Ambient light sensor is unavailable');
    }
  }

  /**
   * Stop listening to ambient light change events
   */
  public off(): void {
    if (this.sensor) {
      this.sensor.stop();
      this.sensor.removeEventListener('reading', this.onSensorReadHandler, false);
      this.sensor.removeEventListener('error', this.onSensorErrorHandler, false);
      this.sensor = null;
    }
  }

  /**
   * Monitor any ambient light change events
   */
  private onSensorReadHandler(): void {
    eventEmitter.emit(ENUM_AMBIENT_LIGHT_CHANGE, {
      illuminance: this.sensor.illuminance,
    });
  }

  /**
   * Catch any errors when monitoring ambient light changes
   *
   * @param event Ambient Light sensor error event
   */
  private onSensorErrorHandler(event: any): void {
    this.errors.push(event.error);

    if (event.error.name === 'NotAllowedError') {
      console.error('Permission to access sensor was denied');
    } else if (event.error.name === 'NotReadableError') {
      console.error('Sensor could not be read');
    } else {
      console.error(event.error);
    }
  }
}

export const ambientLightSensor = new AmbientLightSensor();
