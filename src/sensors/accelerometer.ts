// Features
import getBrowserType from '../features/browserFeatures/getBrowserType';

// Types
import { TNullable } from '../types';

interface IInternalState {
  screenOrientation: number;

  orientation: {
    absolute: boolean;
    alpha: TNullable<number>;
    beta: TNullable<number>;
    gamma: TNullable<number>;
  };

  acceleration: {
    x: TNullable<number>;
    y: TNullable<number>;
    z: TNullable<number>;
  };

  accelerationIncludingGravity: {
    x: TNullable<number>;
    y: TNullable<number>;
    z: TNullable<number>;
  };

  rotationRate: {
    alpha: TNullable<number>;
    beta: TNullable<number>;
    gamma: TNullable<number>;
  };
}

interface IExternalState {
  accelerationIncludingGravityQuaternion: number[];
  accelerationQuaternion: number[];
  orientationQuaternion: number[];
}

// Accelerometer data is very noisy, but stable over the long term
// Gyroscope data is smooth, but tends to drift over the long term

// https://github.com/jeromeetienne/AR.js/blob/048eebc113e1cd136c4fdbbaa491868d5a208887/three.js/examples/vendor/webvr-polyfill.js#L4842-L4988
// https://github.com/marquizzo/three-gimbal/blob/master/src/Gimbal.js

// TODO: reset on visibilitychange
// TODO: android has flipped axis
// TODO: iOS needs permissions
// TODO: take window orientation into account
// TODO: add lerping functionality

// NOTE: Chrome / iOS sensor only works on secure contexts

// event.beta has values between -90 and 90 on mobile Safari and between 180 and -180 on Firefox.
// event.gamma has values between -180 and 180 on mobile Safari and between 90 and -90 on Firefox.

export class Accelerometer {
  private static degreesToRadians = Math.PI / 180;

  private externalState: IExternalState = {
    accelerationIncludingGravityQuaternion: [0, 0, 0, 0],
    accelerationQuaternion: [0, 0, 0, 0],
    orientationQuaternion: [0, 0, 0, 0],
  };

  private internalState: IInternalState = {
    // Screen orientation
    screenOrientation: 0,

    // Device orientation
    orientation: {
      absolute: false,
      alpha: 0,
      beta: 0,
      gamma: 0,
    },

    // Device motion
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

  public start(): void {
    this.onScreenOrientationChangeHandler();

    if ((window as any).ScreenOrientation) {
      window.addEventListener('orientationchange', this.onScreenOrientationChangeHandler, false);
    } else {
      console.warn('Accelerometer -> Device does not support orientationchange event');
    }

    if ((window as any).DeviceMotionEvent) {
      window.addEventListener('devicemotion', this.onDeviceMotionChangeHandler, false);
    } else {
      console.warn('Accelerometer -> Device does not support devicemotion event');
    }

    if ((window as any).DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', this.onDeviceOrientationChangeHandler, false);
    } else {
      console.warn('Accelerometer -> Device does not support deviceorientation event');
    }
  }

  public stop(): void {
    if ((window as any).ScreenOrientation) {
      window.removeEventListener('orientationchange', this.onScreenOrientationChangeHandler, false);
    } else {
      console.warn('Accelerometer -> Device does not support orientationchange event');
    }

    if ((window as any).DeviceMotionEvent) {
      window.removeEventListener('devicemotion', this.onDeviceMotionChangeHandler, false);
    } else {
      console.warn('Accelerometer -> Device does not support devicemotion event');
    }

    if ((window as any).DeviceOrientationEvent) {
      window.removeEventListener('deviceorientation', this.onDeviceOrientationChangeHandler, false);
    } else {
      console.warn('Accelerometer -> Device does not support deviceorientation event');
    }
  }

  // Get the sensor update at a fixed rate independently of the actual native sensor sampling rate
  public update(): IExternalState {
    // orientationQuaternion
    this.externalState.orientationQuaternion = this.convertEulerToQuaternion(
      this.internalState.orientation.beta,
      this.internalState.orientation.gamma,
      this.internalState.orientation.alpha
    );

    // accelerationQuaternion
    this.externalState.accelerationQuaternion = this.convertEulerToQuaternion(
      this.internalState.acceleration.x,
      this.internalState.acceleration.y,
      this.internalState.acceleration.z
    );

    // acceleartionQuaternionIncludingGravity
    this.externalState.accelerationIncludingGravityQuaternion = this.convertEulerToQuaternion(
      this.internalState.accelerationIncludingGravity.x,
      this.internalState.accelerationIncludingGravity.y,
      this.internalState.accelerationIncludingGravity.z
    );

    return this.externalState;
  }

  private convertEulerToQuaternion(
    beta: TNullable<number>,
    gamma: TNullable<number>,
    alpha: TNullable<number>
  ): number[] {
    const eX = beta ? beta * Accelerometer.degreesToRadians : 0;
    const eY = gamma ? gamma * Accelerometer.degreesToRadians : 0;
    const eZ = alpha ? alpha * Accelerometer.degreesToRadians : 0;

    const cZ = Math.cos(eZ * 0.5);
    const sZ = Math.sin(eZ * 0.5);
    const cY = Math.cos(eY * 0.5);
    const sY = Math.sin(eY * 0.5);
    const cX = Math.cos(eX * 0.5);
    const sX = Math.sin(eX * 0.5);

    return [
      sX * cY * cZ - cX * sY * sZ,
      cX * sY * cZ + sX * cY * sZ,
      cX * cY * sZ + sX * sY * cZ,
      cX * cY * cZ - sX * sY * sZ,
    ];
  }

  private onScreenOrientationChangeHandler(): void {
    this.internalState.screenOrientation =
      Number(window.orientation) * Accelerometer.degreesToRadians;
  }

  private onDeviceOrientationChangeHandler(event: DeviceOrientationEvent): void {
    this.internalState.orientation.alpha = event.alpha;
    this.internalState.orientation.beta = event.beta;
    this.internalState.orientation.gamma = event.gamma;
    this.internalState.orientation.absolute = event.absolute;
  }

  private onDeviceMotionChangeHandler(event: DeviceMotionEvent): void {
    if (event.acceleration) {
      this.internalState.acceleration.x = event.acceleration.x;
      this.internalState.acceleration.y = event.acceleration.y;
      this.internalState.acceleration.z = event.acceleration.z;
    }

    if (event.accelerationIncludingGravity) {
      this.internalState.accelerationIncludingGravity.x = event.accelerationIncludingGravity.x;
      this.internalState.accelerationIncludingGravity.y = event.accelerationIncludingGravity.y;
      this.internalState.accelerationIncludingGravity.z = event.accelerationIncludingGravity.z;
    }

    if (event.rotationRate) {
      this.internalState.rotationRate.alpha = event.rotationRate.alpha;
      this.internalState.rotationRate.beta = event.rotationRate.beta;
      this.internalState.rotationRate.gamma = event.rotationRate.gamma;
    }
  }
}

export const accelerometer = new Accelerometer();
