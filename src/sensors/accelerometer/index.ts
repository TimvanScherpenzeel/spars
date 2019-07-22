// Use the RelativeOrientationSensor polyfill

// https://github.com/immersive-web/cardboard-vr-display/blob/13e4fe62ce1ceb31f0fe60955fa242b50c0d998d/src/pose-sensor.js
// https://github.com/immersive-web/cardboard-vr-display/tree/13e4fe62ce1ceb31f0fe60955fa242b50c0d998d/src/sensor-fusion

// https://intel.github.io/generic-sensor-demos/orientation-phone/?relative=1
// https://smus.com/sensor-fusion-prediction-webvr/
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

// Sensors
import { FusionPoseSensor } from './FusionPoseSensor';
import { Quaternion } from './math';

const SENSOR_FREQUENCY = 60;

// TODO: ?? https://github.com/immersive-web/cardboard-vr-display/blob/13e4fe62ce1ceb31f0fe60955fa242b50c0d998d/src/pose-sensor.js#L118-L122

export class PoseSensor {
  private kFilter: number;
  private predictionTime: number;
  private output: Float32Array = new Float32Array(4);
  private sensorQuaternion: Quaternion = new Quaternion();
  private outputQuaternion: Quaternion = new Quaternion();
  private errors: Error[] = [];
  private sensor: any; // RelativeOrientationSensor
  private fusionSensor!: FusionPoseSensor;

  constructor(kFilter: number, predictionTime: number) {
    this.kFilter = kFilter;
    this.predictionTime = predictionTime;

    this.init();
  }

  public init(): void {
    // Attempt to use the RelativeOrientationSensor from Generic Sensor APIs.
    // First available in Chrome M63, this can fail for several reasons, and attempt
    // to fallback to devicemotion. Failure scenarios include:
    //
    // * Generic Sensor APIs do not exist; fallback to devicemotion.
    // * Underlying sensor does not exist; no fallback possible.
    // * Feature Policy failure (in an iframe); no fallback.
    //   https://github.com/immersive-web/webxr/issues/86
    // * Permission to sensor data denied; respect user agent; no fallback to devicemotion.
    //   Browsers are heading towards disabling devicemotion when sensors are denied as well.
    //   https://www.chromestatus.com/feature/5023919287304192

    let sensor = null;

    try {
      // @ts-ignore RelativeOrientationSensor is a part of the Generic Sensor API specification
      sensor = new RelativeOrientationSensor({
        frequency: SENSOR_FREQUENCY,
        referenceFrame: 'screen',
      });

      sensor.addEventListener('error', this.onSensorError);
    } catch (error) {
      this.errors.push(error);

      // Sensors are available in Chrome M63, however the Feature Policy
      // integration is not available until Chrome M65, resulting in Sensors
      // only being available in main frames.
      // https://developers.google.com/web/updates/2017/09/sensors-for-the-web#feature_policy_integration
      if (error.name === 'SecurityError') {
        console.error('Cannot construct sensors due to the Feature Policy');
        console.warn(
          'Attempting to fall back using "devicemotion"; however this will ' +
            'fail in the future without correct permissions.'
        );
        this.useDeviceMotion();
      } else if (error.name === 'ReferenceError') {
        // Fall back to devicemotion.
        this.useDeviceMotion();
      } else {
        console.error(error);
      }
    }

    if (sensor) {
      this.sensor = sensor;
      this.sensor.addEventListener('reading', this.onSensorRead);
      this.sensor.start();
    }
  }

  public useDeviceMotion(): void {
    this.fusionSensor = new FusionPoseSensor(this.kFilter, this.predictionTime);

    if (this.sensor) {
      this.sensor.removeEventListener('reading', this.onSensorRead);
      this.sensor.removeEventListener('error', this.onSensorError);
      this.sensor = null;
    }
  }

  public getOrientation(): Float32Array {
    if (this.fusionSensor) {
      return this.fusionSensor.getOrientation();
    }

    if (!this.sensor || !this.sensor.quaternion) {
      this.output[0] = 0;
      this.output[1] = 0;
      this.output[2] = 0;
      this.output[3] = 1;

      return this.output;
    }

    this.sensorQuaternion.set(
      this.sensor.quaternion[0],
      this.sensor.quaternion[1],
      this.sensor.quaternion[2],
      this.sensor.quaternion[3]
    );

    this.output[0] = this.outputQuaternion.x;
    this.output[1] = this.outputQuaternion.y;
    this.output[2] = this.outputQuaternion.z;
    this.output[3] = this.outputQuaternion.w;

    return this.output;
  }

  private onSensorError(event: any): void {
    this.errors.push(event.error);

    if (event.error.name === 'NotAllowedError') {
      console.error('Permission to access sensor was denied');
    } else if (event.error.name === 'NotReadableError') {
      console.error('Sensor could not be read');
    } else {
      console.error(event.error);
    }

    this.useDeviceMotion();
  }

  private onSensorRead(): void {
    // TODO
  }
}
