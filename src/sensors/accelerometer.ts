// Features
import getBrowserType from '../features/browserFeatures/getBrowserType';

export class Accelerometer {
  private static degreesToRadians = Math.PI / 180;

  private accelerationQuaternion: number[] = [0, 0, 0, 0];
  private accelerationIncludingGravityQuaternion: number[] = [0, 0, 0, 0];
  private orientationQuaternion: number[] = [0, 0, 0, 0];

  private state = {
    // Device orientation
    orientation: {
      absolute: 0,
      alpha: 0,
      beta: 0,
      gamma: 0,
    },

    acceleration: {
      x: 0,
      y: 0,
      z: 0,
    },

    accelerationIncludingGravity: {
      x: 0,
      y: 0,
      z: 0,
    },

    rotationRate: {
      alpha: 0,
      beta: 0,
      gamma: 0,
    },
  };

  // Device orientation
  // Acceleration

  // TODO: reset on visibilitychange
  // TODO: android has flipped axis
  // TODO: iOS needs permissions

  // Chrome / iOS sensor only works on secure contexts

  // event.beta has values between -90 and 90 on mobile Safari and between 180 and -180 on Firefox.
  // event.gamma has values between -180 and 180 on mobile Safari and between 90 and -90 on Firefox.

  public start(): void {
    if ((window as any).DeviceMotionEvent) {
      window.addEventListener('devicemotion', this.onDeviceMotionChangeHandler, false);
    } else {
      console.warn('onDeviceOrientationChange -> Device does not support devicemotion event');
    }
  }

  public stop(): void {
    if ((window as any).DeviceMotionEvent) {
      window.removeEventListener('devicemotion', this.onDeviceMotionChangeHandler, false);
    } else {
      console.warn('onDeviceOrientationChange -> Device does not support devicemotion event');
    }
  }

  // Get the sensor update at a fixed rate independently of the actual native sensor sampling rate
  public update(): {
    accelerationQuaternion: number[];
    accelerationIncludingGravityQuaternion: number[];
    orientation: number[];
  } {
    return {
      accelerationIncludingGravityQuaternion: this.accelerationIncludingGravityQuaternion,
      accelerationQuaternion: this.accelerationQuaternion,
      orientation: this.orientationQuaternion,
    };
  }

  private onDeviceMotionChangeHandler(event: DeviceMotionEvent): void {
    const { alpha, beta, gamma } = (event as any).rotationRate;

    const x = beta ? beta * Accelerometer.degreesToRadians : 0;
    const y = gamma ? gamma * Accelerometer.degreesToRadians : 0;
    const z = alpha ? alpha * Accelerometer.degreesToRadians : 0;

    const cZ = Math.cos(z * 0.5);
    const sZ = Math.sin(z * 0.5);
    const cY = Math.cos(y * 0.5);
    const sY = Math.sin(y * 0.5);
    const cX = Math.cos(x * 0.5);
    const sX = Math.sin(x * 0.5);

    const qx = sX * cY * cZ - cX * sY * sZ;
    const qy = cX * sY * cZ + sX * cY * sZ;
    const qz = cX * cY * sZ + sX * sY * cZ;
    const qw = cX * cY * cZ - sX * sY * sZ;

    this.orientationQuaternion[0] = qx;
    this.orientationQuaternion[1] = qy;
    this.orientationQuaternion[2] = qz;
    this.orientationQuaternion[3] = qw;
  }
}

export const accelerometer = new Accelerometer();
