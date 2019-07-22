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

import { FusionPoseSensor } from './FusionPoseSensor';
import { Vector3, Quaternion } from './math';

const SENSOR_FREQUENCY = 60;

// https://github.com/immersive-web/cardboard-vr-display/blob/13e4fe62ce1ceb31f0fe60955fa242b50c0d998d/src/pose-sensor.js#L118-L122

export class PoseSensor {
  public outputQuaternion: Float32Array = new Float32Array(4);

  constructor(kFilter: number, predictionTime: number) {
    this.kFilter = kFilter;
    this.predictionTime = predictionTime;
  }

  public init() {
    let sensor = null;

    try {
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
      this.api = 'sensor';
      this.sensor = sensor;
      this.sensor.addEventListener('reading', this.onSensorRead);
      this.sensor.start();
    }
  }

  public useDeviceMotion() {
    this.api = 'devicemotion';
    this.fusionSensor = new FusionPoseSensor(this.kFilter, this.predictionTime);

    if (this.sensor) {
    }
  }
}
