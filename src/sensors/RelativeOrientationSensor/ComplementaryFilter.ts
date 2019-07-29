// Features
import getBrowserType from '../../features/browserFeatures/getBrowserType';

// Sensors
import { Quaternion, Vector3 } from './math';
import { SensorSample } from './sensorSample';
import { isTimestampDeltaValid } from './utilities';

/**
 * An implementation of a simple complementary filter, which fuses gyroscope and
 * accelerometer data from the 'devicemotion' event
 *
 * Accelerometer data is very noisy, but stable over the long term
 * Gyroscope data is smooth, but tends to drift over the long term
 *
 * This fusion is relatively simple:
 *
 * 1 Get orientation estimates from accelerometer by applying a low-pass filter on that data
 * 2 Get orientation estimates from gyroscope by integrating over time
 * 3 Combine the two estimates, weighing (1) in the long term, but (2) for the short term
 */
export class ComplementaryFilter {
  public currentAccelerometerMeasurement: SensorSample = new SensorSample();
  public currentGyroscopeMeasurement: SensorSample = new SensorSample();
  public previousGyroscopeMeasurement: SensorSample = new SensorSample();

  private kalmanFilterWeight: number;
  private filterQuaternion: Quaternion;
  private previousFilterQuaternion: Quaternion = new Quaternion();
  private accelerationQuaternion: Quaternion = new Quaternion();
  private isOrientationInitialized: boolean = false;
  private estimatedGravity: Vector3 = new Vector3();
  private measuredGravity: Vector3 = new Vector3();
  private gyroscopeIntegralQuaternion: Quaternion = new Quaternion();

  constructor(kalmanFilterWeight: number) {
    this.kalmanFilterWeight = kalmanFilterWeight;

    if (getBrowserType.isiOS) {
      this.filterQuaternion = new Quaternion(-1, 0, 0, 1);
    } else {
      this.filterQuaternion = new Quaternion(1, 0, 0, 1);
    }

    this.previousFilterQuaternion.copy(this.filterQuaternion);
  }

  public addAccelerometerMeasurement(vector: Vector3, timestamp: number): void {
    this.currentAccelerometerMeasurement.set(vector, timestamp);
  }

  public addGyroscopeMeasurement(vector: Vector3, timestamp: number): void {
    this.currentGyroscopeMeasurement.set(vector, timestamp);

    const deltaTime = timestamp - this.previousGyroscopeMeasurement.timestamp;

    if (isTimestampDeltaValid(deltaTime)) {
      this.run();
    }

    this.previousGyroscopeMeasurement.copy(this.currentGyroscopeMeasurement);
  }

  public run(): void {
    if (!this.isOrientationInitialized) {
      this.accelerationQuaternion = this.accelerationToQuaternion(
        this.currentAccelerometerMeasurement.sample
      );
      this.previousFilterQuaternion.copy(this.accelerationQuaternion);
      this.isOrientationInitialized = true;

      return;
    }

    const deltaTime =
      this.currentGyroscopeMeasurement.timestamp - this.previousGyroscopeMeasurement.timestamp;

    const gyroscopeDeltaQuaternion = this.gyroscopeToQuaternionDelta(
      this.currentGyroscopeMeasurement.sample,
      deltaTime
    );

    this.gyroscopeIntegralQuaternion.multiply(gyroscopeDeltaQuaternion);

    // filter_1 = K * (filter_0 + gyro * dT) + (1 - K) * accel.
    this.filterQuaternion.copy(this.previousFilterQuaternion);
    this.filterQuaternion.multiply(gyroscopeDeltaQuaternion);

    // Calculate the delta between the current estimated gravity and the real
    // gravity vector from accelerometer.
    const inverseFilterQuaternion = new Quaternion();
    inverseFilterQuaternion.copy(this.filterQuaternion);
    inverseFilterQuaternion.inverse();

    this.estimatedGravity.set(0, 0, -1);
    this.estimatedGravity.applyQuaternion(inverseFilterQuaternion);
    this.estimatedGravity.normalize();

    this.measuredGravity.copy(this.currentAccelerometerMeasurement.sample);
    this.measuredGravity.normalize();

    // Compare estimated gravity with measured gravity, get the delta quaternion
    // between the two.
    const deltaQuaternion = new Quaternion();
    deltaQuaternion.setFromUnitVectors(this.estimatedGravity, this.measuredGravity);
    deltaQuaternion.inverse();

    // Calculate the SLERP target: current orientation plus the measured-estimated
    // quaternion delta.
    const targetQuaternion = new Quaternion();
    targetQuaternion.copy(this.filterQuaternion);
    targetQuaternion.multiply(deltaQuaternion);

    // SLERP factor, 0 is pure gyroscope, 1 is pure accelerometer
    this.filterQuaternion.slerp(targetQuaternion, 1 - this.kalmanFilterWeight);

    this.previousFilterQuaternion.copy(this.filterQuaternion);
  }

  public getOrientation(): Quaternion {
    return this.filterQuaternion;
  }

  private accelerationToQuaternion(acceleration: Vector3): Quaternion {
    const normalizedAcceleration = new Vector3();
    normalizedAcceleration.copy(acceleration);
    normalizedAcceleration.normalize();

    const accelerationQuaternion = new Quaternion();
    accelerationQuaternion.setFromUnitVectors(new Vector3(0, 0, -1), normalizedAcceleration);
    accelerationQuaternion.inverse();

    return accelerationQuaternion;
  }

  private gyroscopeToQuaternionDelta(gyroscope: Vector3, deltaTime: number): Quaternion {
    const deltaQuaternion = new Quaternion();
    const axis = new Vector3();
    axis.copy(gyroscope);
    axis.normalize();

    deltaQuaternion.setFromAxisAngle(axis, gyroscope.length() * deltaTime);

    return deltaQuaternion;
  }
}
